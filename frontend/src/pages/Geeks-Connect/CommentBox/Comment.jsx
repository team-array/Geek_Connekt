import React from "react";
import { CommentBoxContainer } from "./Comment.style.jsx";
import Backdrop from "@mui/material/Backdrop";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import pp from "../Profile/components/img/profile-pic.png";
import "./Comment.scss";
import { Comment, Avatar, Form, Button, List, Input } from "antd";
import moment from "moment";
import { useDispatch, useSelector} from "react-redux";

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={2} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const CommentBox = () => {
  const [msg, setmsg] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const dispatch = useDispatch();
  const Comment_Box = useSelector((state) => state.Comment_Box);
  const [comments, setComments] = React.useState([
    {
        author: 'Akshay',
        avatar: pp,
        datetime: moment().fromNow(),
        content: <p>lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor </p>,
      },
      {
        author: 'Akshay',
        avatar: pp,
        datetime: moment().fromNow(),
        content: <p>lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor </p>,
      },
      {
        author: 'Akshay',
        avatar: pp,
        datetime: moment().fromNow(),
        content: <p>lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor </p>,
      },
    {
        author: 'Murari',
        avatar: pp,
        datetime: moment().fromNow(),
        content: <p>lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor </p>,
      },
  ]);
  const sendmsg = () => {
    setSubmitting(true); // for load effect
    console.log(msg);
    setComments({
        author: 'Murari',
        avatar: pp,
        datetime: moment().fromNow(),
        content: <p> {msg} </p>,
    });
    setmsg("");
    setSubmitting(false); // stop loading effect
  };
  return (
    <div className="Comment">
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: "9999999",
          backgroundColor: "rgba(0,0,0,.85)",
        }}
        open={Comment_Box}
      >
        <IconButton
          aria-label="delete"
          sx={{
            position: "absolute",
            top: "15px",
            right: "15px",
            zIndex: "9999999",
          }}
          onClick={()=>{
            dispatch({type:"SET_COMMENT_BOX", payload:false})
          }}
        >
          <CloseIcon
            style={{
              color: "#fff",
              zIndex: "9999999",
              fontSize: "35px",
            }}
          />
        </IconButton>
        <CommentBoxContainer>
          <div
            className="user-profile"
            style={{
              position: "absolute",
              top: 5,
              padding: "15px 20px 10px 43px",
              borderBottom: "1px solid #aaa",
              width: "100%",
            }}
          >
            <img src={pp} alt="" />
            <div>
              <p>Kranthi</p>
              <span>June 24 2021, 13:40pm</span>
            </div>
          </div>
          {comments.length > 0 && 
                <div style={{
                    // overflow: "scroll",
                }}>
                    <CommentList 
                        comments={comments} />
                </div>
            }
          <Comment
            avatar={<Avatar src={pp} alt="profile" />}
            style={{
              width: "100%",
              position: "absolute",
              bottom: "0",
              padding: "0px 50px",
            }}
            content={
              <Editor
                onChange={(e) => {
                  setmsg(e.target.value);
                }}
                onSubmit={sendmsg}
                submitting={submitting}
                value={msg}
              />
            }
          />
        </CommentBoxContainer>
      </Backdrop>
    </div>
  );
};

export default CommentBox;
