import { Box, Button, Container } from "@mui/material";
import { findByLabelText } from "@testing-library/react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import withAuth from "../../hoc/hoc";

function EtudiantDashboard() {
  const socket = io("http://localhost:3000");
  const [connected, setConnected] = useState(socket.connected);
  const [notifs, setNotifs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const token = jwtDecode(localStorage.getItem("token"));
    console.log("token sub ", token.sub);
    axios.get("http://localhost:3000/notification/" + token.sub).then((res) => {
      console.log(res);
      setNotifs((prevState) => {
        return res.data;
      });
    });
    console.log("notifications====", notifs);
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(" user connected");
    });
    const token = jwtDecode(localStorage.getItem("token"));

    console.log("notifications====", notifs);
    console.log(token);
    socket.on(token.sub, (data) => {
      console.log("socket Data", data);
      axios
        .post("http://localhost:3000/notification", {
          idNotification: "1",
          data: data,
          idUser: token.sub,
          // date: new Date(),
        })
        .then("/etudiantDashboard");
    });

    return () => {
      socket.off("connect");
      socket.off("newmessage");
      console.log("off");
    };
  }, []);
  const datify = () => {
    const date = new Date(1682963738847);
    const d = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    console.log("date", d);
    return d;
  };
  return (
    // <ContainerDiv maxWidth="sm">
    //   <LittleContainer>
    //     {notifs &&
    //       notifs.map((not, index) => {
    //         return <h1 key={index}> {not.data}</h1>;
    //       })}
    //   </LittleContainer>
    // </ContainerDiv>
    <Containerg>
      <Title>Notifications</Title>
      <List>
        {notifs?.map((notification) => (
          <ListItem key={notification.id}>
            <Message read={notification.read}>{notification.data}</Message>
            {/* <Date>{notification.date}</Date> */}
          </ListItem>
        ))}
      </List>
    </Containerg>
  );
}
export default withAuth(EtudiantDashboard, ["etudiant"]);

const ContainerDiv = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    width: 80%;
    height: auto;
  }
`;
const LittleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1em;
  @media (max-width: 768px) {
    width: 80%;
    height: auto;
    margin: 2em;
  }
`;
const PfeImg = styled.img`
  display: flex;
  justify-content: center;
  margin-left: 11em;
  margin-top: 2em;
  margin-bottom: 2em;
  @media (max-width: 768px) {
    width: 80%;
    height: auto;
    margin: 1em;
  }
`;
const Containerg = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: ${(props) => (props.read ? "#e6e6e6" : "#fff")};
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const Message = styled.p`
  font-size: 16px;
  font-weight: ${(props) => (props.read ? "normal" : "bold")};
  color: ${(props) => (props.read ? "#333" : "#000")};
`;

const Date = styled.span`
  font-size: 14px;
  color: #999;
`;
