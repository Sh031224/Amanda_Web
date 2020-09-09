import React, { useCallback, useEffect, useState } from "react";
import "./ProfileComment.scss";
import { SERVER } from "../../../config/config.json";
import { FaTelegramPlane } from "react-icons/fa";
import axios from "axios";
import { UserInfoType } from "../../../util/types/UserStoreType";
import generateURL from "../../../util/lib/generateURL";
import { useLocation } from "react-router-dom";
import ProfileCommentItem from "./ProfileCommentItem";

interface ProfileCommentProps {
  id: string;
  myInfo: UserInfoType;
}

const ProfileComment = ({ id, myInfo }: ProfileCommentProps) => {
  const { search } = useLocation();

  const [comments, setComments] = useState<any>([]);
  const [commentInput, setCommentInput] = useState<string>("");

  const createComment = useCallback(async () => {
    if (commentInput !== "") {
      await axios.post(
        `${SERVER}/createComment`,
        {
          id,
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
  }, [commentInput, search, id]);

  const commentEnter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode === 13) {
        createComment();
      }
    },
    [commentInput, createComment]
  );

  const getComments = useCallback(() => {
    axios
      .get(`${SERVER}/showComment?id=${search.replace("?id=", "")}`)
      .then(async (res: any) => {
        let commentList = res.data.comment;

        const promise: Promise<any>[] = [];
        res.data.comment.map((data: any, i: number) => {
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
  }, [search]);

  useEffect(() => {
    getComments();
  }, [getComments, search]);

  return (
    <div className="profile-comment">
      <div className="profile-comment-box">
        <div className="profile-comment-create">
          <input
            className="profile-comment-create-input"
            type="text"
            value={commentInput}
            placeholder="내용을 입력해주세요."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCommentInput(e.target.value)
            }
            maxLength={255}
            onKeyDown={commentEnter}
          />
          <FaTelegramPlane
            onClick={createComment}
            className="profile-comment-create-submit"
          />
        </div>
        {comments && (
          <>
            {comments.map((comment: any, i: number) => (
              <ProfileCommentItem
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

export default ProfileComment;
