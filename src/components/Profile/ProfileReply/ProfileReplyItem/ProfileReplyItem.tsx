import React, { useCallback, useState } from "react";
import "./ProfileReplyItem.scss";
import { FaTelegramPlane } from "react-icons/fa";
import { IoIosLock, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { UserInfoType } from "../../../../util/types/UserStoreType";
import TimeCounting from "time-counting";
import axios from "axios";
import { SERVER } from "../../../../config/config.json";

interface ProfileReplyItemProps {
  comment: any;
  myInfo: UserInfoType;
}

const ProfileReplyItem = ({ comment, myInfo }: ProfileReplyItemProps) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editInput, setEditInput] = useState<string>(comment.comment);

  const editComment = async (idx: number, content: string) => {
    await axios.post(
      `${SERVER}/updateComment`,
      { idx: idx, commnet: content },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
    );
  };

  const cancelEdit = useCallback(() => {
    setEdit(false);
    setEditInput(comment.comment);
  }, [comment]);

  return (
    <>
      {edit ? (
        <div className="profile-reply-create">
          <input
            className="profile-reply-create-input"
            type="text"
            value={editInput}
            placeholder="내용을 입력해주세요."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEditInput(e.target.value)
            }
            autoFocus
            maxLength={255}
            onKeyDown={async (e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Escape") {
                setEdit(false);
              } else if (e.key === "Enter") {
                await editComment(comment.idx, editInput);
                cancelEdit();
              }
            }}
          />
          <MdCancel
            onClick={() => cancelEdit()}
            className="profile-reply-create-cancel"
          />
          <FaTelegramPlane
            // onClick={createComment}
            className="profile-reply-create-submit"
          />
        </div>
      ) : (
        <div className="profile-reply-item">
          <img src={comment.user_image} className="profile-reply-item-img" />
          <div className="profile-reply-box">
            <div className="profile-reply-box-title">
              {comment.user_name}
              {comment.fk_user_id === comment.fk_object_id && (
                <IoMdCheckmarkCircleOutline className="profile-reply-box-title-admin" />
              )}
              {comment.is_private && (
                <IoIosLock className="profile-reply-box-title-lock" />
              )}
              <span className="profile-reply-box-time">
                {TimeCounting(comment.created_at, { lang: "ko" })}
              </span>
            </div>
            <span className="profile-reply-box-content">{comment.comment}</span>
            <div className="profile-reply-box-util">
              <span
                className="profile-reply-box-util-reply"
                // onClick={() => setReply(true)}
              >
                답글
              </span>
              {comment.fk_user_id === myInfo.user_id && (
                <span
                  className="profile-reply-box-util-modify"
                  onClick={() => setEdit(true)}
                >
                  수정
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileReplyItem;
