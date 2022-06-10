import { useState } from "react";
import styled from "styled-components";

const UserBio = ({ bioUpdate, setBioUpdate, user }) => {
  const [editFlag, setEditFlag] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const editBio = (e) => {
    setEditFlag(!editFlag);
  };
  const submitBio = (e) => {
    e.preventDefault();
    fetch("/api/post-bio", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user,
        newBio: e.target[0].value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setEditFlag(!editFlag);
          setBioUpdate(!bioUpdate);
        } else {
          setEditFlag(!editFlag);
        }
      });
  };

  return (
    <BioWrapper onClick={!editFlag ? editBio : undefined}>
      <Bio hidden={editFlag}>{user.bio !== null ? user.bio : "Add a bio"}</Bio>
      <form onSubmit={submitBio} hidden={!editFlag}>
        <BioInput
          placeholder={user.bio !== null ? user.bio : "Add a bio"}
        ></BioInput>
        <BioButton type={"submit"}>Submit</BioButton>
      </form>
    </BioWrapper>
  );
};

export default UserBio;

const Bio = styled.div`
  color: lightgray;
  font-style: italic;
  max-height: 200px;
  max-width: 500px;
  word-wrap: break-word;
`;

const BioButton = styled.button`
  align-items: center;
  background-color: var(--color-dark-green);
  border: none;
  border-radius: 5px;
  color: var(--color-light-beige);
  display: flex;
  font-family: var(--font-body);
  font-size: 0.75rem;
  justify-content: center;
  margin: 5px 0px;
  padding: 5px;
  width: 158px;
  &:hover {
    background-color: var(--color-green);
    cursor: pointer;
  }
`;

const BioInput = styled.input`
  border-radius: 5px;
  font-family: var(--font-body);
  width: 150px;
`;

const BioWrapper = styled.div`
  display: flex;
`;
