import React, { useCallback, useEffect, useState } from "react";
import "./ProfileReply.scss";
import { SERVER } from "../../../config/config.json";
import { FaTelegramPlane } from "react-icons/fa";
import axios from "axios";
import { UserInfoType } from "../../../util/types/UserStoreType";
import generateURL from "../../../util/lib/generateURL";
import { useLocation } from "react-router-dom";
import ProfileReplyItem from "./ProfileReplyItem";
import { MdCancel } from "react-icons/md";

interface ProfileReplyProps {
  idx: number;
  myInfo: UserInfoType;
  create: boolean;
  setCreate: React.Dispatch<React.SetStateAction<boolean>>;
  fk_object_id: string;
}

const ProfileReply = ({
  idx,
  myInfo,
  create,
  setCreate,
  fk_object_id
}: ProfileReplyProps) => {
  const { search } = useLocation();

  const [comments, setComments] = useState<any>([]);
  const [commentInput, setCommentInput] = useState<string>("");

  const createReply = useCallback(async () => {
    if (commentInput !== "") {
      await axios.post(
        `${SERVER}/createReplyComment`,
        {
          idx,
          comment: commentInput
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );
      setCommentInput("");
      getComments();
    }
  }, [commentInput, idx]);

  const cancelCreate = () => {
    setCreate(false);
    setCommentInput("");
  };

  const getComments = useCallback(() => {
    axios
      .get(`${SERVER}/showReplyComment?idx=${idx}`)
      .then(async (res: any) => {
        let commentList = res.data.replyComment;

        const promise: Promise<any>[] = [];
        res.data.replyComment.map((data: any, i: number) => {
          promise.push(
            axios.get(`${SERVER}/showUserInfo?id=${data.fk_user_id}`)
          );
        });
        const result = await Promise.all(promise);

        result.map((data: any, i: number) => {
          commentList[i].user_image = generateURL(data.data.data[0].image);
          commentList[i].user_name = data.data.data[0].name;
        });

        commentList.sort((a: any, b: any) => {
          return a.created_at < b.created_at
            ? -1
            : a.created_at > b.created_at
            ? 1
            : 0;
        });
        setComments(commentList);
      });
  }, [idx]);

  useEffect(() => {
    getComments();
  }, [getComments, idx]);

  return (
    <div className="profile-reply">
      <div className="profile-reply-box">
        {create && (
          <div className="profile-reply-create">
            <input
              className="profile-reply-create-input"
              type="text"
              value={commentInput}
              placeholder="내용을 입력해주세요."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCommentInput(e.target.value)
              }
              autoFocus
              maxLength={255}
              onKeyDown={async (e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Escape") {
                  setCreate(false);
                } else if (e.key === "Enter") {
                  await createReply();
                  cancelCreate();
                }
              }}
            />
            <MdCancel
              onClick={() => cancelCreate()}
              className="profile-comment-create-cancel"
            />
            <FaTelegramPlane
              // onClick={createComment}
              className="profile-comment-create-submit"
            />
          </div>
        )}
        {comments && (
          <>
            {comments.map((comment: any, i: number) => (
              <ProfileReplyItem
                fk_object_id={fk_object_id}
                getComments={getComments}
                comment={comment}
                myInfo={myInfo}
                key={i}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileReply;
