import React, { useCallback, useEffect, useState } from "react";
import "./ProfileReply.scss";
import { SERVER } from "../../../config/config.json";
import { FaTelegramPlane } from "react-icons/fa";
import axios from "axios";
import { UserInfoType } from "../../../util/types/UserStoreType";
import generateURL from "../../../util/lib/generateURL";
import { useLocation } from "react-router-dom";
import ProfileReplyItem from "./ProfileReplyItem";

interface ProfileReplyProps {
  idx: number;
  myInfo: UserInfoType;
}

const ProfileReply = ({ idx, myInfo }: ProfileReplyProps) => {
  const { search } = useLocation();

  const [comments, setComments] = useState<any>([]);
  const [commentInput, setCommentInput] = useState<string>("");

  const createComment = useCallback(async () => {
    if (commentInput !== "") {
      await axios.post(
        `${SERVER}/createComment`,
        {
          id: Number(search.replace("?id=", "")),
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
  }, [commentInput, search]);

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
        setComments(commentList);
      });
  }, [idx]);

  useEffect(() => {
    getComments();
  }, [getComments, idx]);

  return (
    <div className="profile-reply">
      <div className="profile-reply-box">
        {comments && (
          <>
            {comments.map((comment: any, i: number) => (
              <ProfileReplyItem comment={comment} myInfo={myInfo} key={i} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileReply;
