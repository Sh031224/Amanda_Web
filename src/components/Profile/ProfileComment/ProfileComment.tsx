import React, { useEffect, useState } from "react";
import "./ProfileComment.scss";
import { SERVER } from "../../../config/config.json";
import { FaTelegramPlane } from "react-icons/fa";
import { IoIosLock, IoMdCheckmarkCircleOutline } from "react-icons/io";
import TimeCounting from "time-counting";
import axios from "axios";
import { UserInfoType } from "../../../util/types/UserStoreType";

interface ProfileCommentProps {
  id: string;
  myInfo: UserInfoType;
}

const ProfileComment = ({ id, myInfo }: ProfileCommentProps) => {
  const [comments, setComments] = useState<any>([]);

  useEffect(() => {
    axios.get(`${SERVER}/showComment?id=${id}`).then((res: any) => {
      setComments(res.data.comment);
    });
  }, []);

  return (
    <div className="profile-comment">
      <div className="profile-comment-box">
        <div className="profile-comment-create">
          <input
            className="profile-comment-create-input"
            type="text"
            // value={commentInput}
            placeholder="내용을 입력해주세요."
            // onChange={(e: ChangeEvent<HTMLInputElement>) =>
            // setCommentInput(e.target.value)
            // }
            maxLength={255}
            // onKeyPress={commentEnter}
          />
          <FaTelegramPlane
            // onClick={commentCreate}
            className="profile-comment-create-submit"
          />
        </div>
        {comments && (
          <>
            {comments.map((comment: any, i: number) => {
              return (
                <div className="profile-comment-item" key={i}>
                  <div className="profile-comment-box">
                    <div className="profile-comment-box-title">
                      {comment.fk_user_id}
                      {comment.fk_user_id === comment.fk_object_id && (
                        <IoMdCheckmarkCircleOutline className="profile-comment-box-title-admin" />
                      )}
                      {comment.is_private && (
                        <IoIosLock className="profile-comment-box-title-lock" />
                      )}
                      <span className="profile-comment-box-time">
                        {TimeCounting(comment.created_at, { lang: "ko" })}
                      </span>
                    </div>
                    <span className="profile-comment-box-content">
                      {comment.comment}
                    </span>
                    <div className="profile-comment-box-util">
                      <span
                        className="profile-comment-box-util-reply"
                        // onClick={() => setReply(true)}
                      >
                        답글
                      </span>
                      {comment.fk_user_id === myInfo.user_id && (
                        <span
                          className="profile-comment-box-util-modify"
                          // onClick={() => setModify(true)}
                        >
                          수정
                        </span>
                      )}
                      {comment.fk_user_id === myInfo.user_id && (
                        <span
                          className="profile-comment-box-util-delete"
                          // onClick={() => deleteComment(comment.idx)}
                        >
                          삭제
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileComment;
