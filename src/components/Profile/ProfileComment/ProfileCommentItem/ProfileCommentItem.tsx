import React, { useCallback, useState } from "react";
import "./ProfileCommentItem.scss";
import { FaTelegramPlane } from "react-icons/fa";
import { IoIosLock, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { UserInfoType } from "../../../../util/types/UserStoreType";
import TimeCounting from "time-counting";
import axios from "axios";
import { SERVER } from "../../../../config/config.json";
import ProfileReply from "../../ProfileReply";

interface ProfileCommentItemProps {
  comment: any;
  myInfo: UserInfoType;
  getComments: () => void;
}

const ProfileCommentItem = ({
  comment,
  myInfo,
  getComments
}: ProfileCommentItemProps) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editInput, setEditInput] = useState<string>(comment.comment);

  const [create, setCreate] = useState<boolean>(false);

  const editComment = async (idx: number, content: string) => {
    await axios.post(
      `${SERVER}/updateComment`,
      { idx: idx, comment: content },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
    );
    getComments();
  };

  const cancelEdit = useCallback(() => {
    setEdit(false);
    setEditInput(comment.comment);
  }, [comment]);

  return (
    <div className="profile-comment-t">
      {edit ? (
        <div className="profile-comment-create" style={{ marginTop: "30px" }}>
          <input
            className="profile-comment-create-input"
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
            className="profile-comment-create-cancel"
          />
          <FaTelegramPlane
            // onClick={createComment}
            className="profile-comment-create-submit"
          />
        </div>
      ) : (
        <div className="profile-comment-item">
          <img src={comment.user_image} className="profile-comment-item-img" />
          <div className="profile-comment-box">
            <div className="profile-comment-box-title">
              {comment.user_name}
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
                onClick={() => setCreate(true)}
              >
                답글
              </span>
              {comment.fk_user_id === myInfo.user_id && (
                <span
                  className="profile-comment-box-util-modify"
                  onClick={() => setEdit(true)}
                >
                  수정
                </span>
              )}
            </div>
          </div>
        </div>
      )}
      <ProfileReply
        fk_object_id={comment.fk_object_id}
        idx={comment.idx}
        myInfo={myInfo}
        create={create}
        setCreate={setCreate}
      />
      {/* <div className="profile-reply-create">
          <input
            className="profile-reply-create-input"
            type="text"
            value={commentInput}
            placeholder="내용을 입력해주세요."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCommentInput(e.target.value)
            }
            maxLength={255}
            onKeyPress={commentEnter}
          />
          <FaTelegramPlane
            onClick={createComment}
            className="profile-reply-create-submit"
          />
        </div> */}
    </div>
  );
};

export default ProfileCommentItem;
