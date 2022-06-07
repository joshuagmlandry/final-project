import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import moment from "moment";
import { useContext, useState } from "react";
import { FilterContext } from "./FilterContext";
import ReCAPTCHA from "react-google-recaptcha";
const { v4: uuidv4 } = require("uuid");

const ReviewForm = ({ queriedCampsite }) => {
  const { user, isAuthenticated } = useAuth0();
  const { postAdded, setPostAdded } = useContext(FilterContext);
  const postingUser = isAuthenticated ? user : { sub: "Guest", name: "Guest" };
  const [statusMessage, setStatusMessage] = useState("");
  const [typedReview, setTypedReview] = useState("");
  const [postSending, setPostSending] = useState(false);
  let id = uuidv4();

  const changeHandler = (e) => {
    setTypedReview(e.target.value);
    setStatusMessage(500 - e.target.value.length);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setPostSending(true);
    setStatusMessage("");
    fetch("/api/post-review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        campsite: queriedCampsite,
        title: e.target[0].value,
        rating: [
          e.target[1].checked,
          e.target[2].checked,
          e.target[3].checked,
          e.target[4].checked,
          e.target[5].checked,
        ],
        review: e.target[6].value,
        user: postingUser.sub,
        name: postingUser.name,
        time: moment().format("MMMM Do YYYY, h:mm:ss a"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPostSending(false);
        setPostAdded(!postAdded);
        if (data.status === 200) {
          id = uuidv4();
          setStatusMessage("Review successfully posted!");
        }
      });
  };

  return (
    <Wrapper>
      <ReviewWrapper>
        <ReviewsHeader>Leave a review</ReviewsHeader>
        <StyledForm onSubmit={submitHandler}>
          <TitleInput placeholder="Title" required></TitleInput>
          <RatingWrapper>
            <Rating>
              <RatingTitle>⭐</RatingTitle>
              <RatingCheckbox type="radio" name="rating" required />
            </Rating>
            <Rating>
              <RatingTitle>⭐⭐</RatingTitle>
              <RatingCheckbox type="radio" name="rating" />
            </Rating>
            <Rating>
              <RatingTitle>⭐⭐⭐</RatingTitle>
              <RatingCheckbox type="radio" name="rating" />
            </Rating>
            <Rating>
              <RatingTitle>⭐⭐⭐⭐</RatingTitle>
              <RatingCheckbox type="radio" name="rating" />
            </Rating>
            <Rating>
              <RatingTitle>⭐⭐⭐⭐⭐</RatingTitle>
              <RatingCheckbox type="radio" name="rating" />
            </Rating>
          </RatingWrapper>
          <ReviewText
            placeholder="Your review here..."
            required
            onChange={changeHandler}
          ></ReviewText>
          <SubmitAndMessage>
          {/* <ReCAPTCHA required sitekey=""/> */}
            <SubmitButton
              type="submit"
              disabled={postSending || typedReview.length > 500}
            >
              {postSending ? "Sending..." : "Submit"}
            </SubmitButton>
            <SubmitMessage typedReview={typedReview}>
              {statusMessage}
            </SubmitMessage>
          </SubmitAndMessage>
        </StyledForm>
      </ReviewWrapper>
    </Wrapper>
  );
};

export default ReviewForm;

const Header = styled.div`
  margin: 10px 0;
`;

const Rating = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 20px;
`;

const RatingCheckbox = styled.input``;

const RatingTitle = styled.div``;

const RatingWrapper = styled.div`
  display: flex;
  margin: 10px 0;
`;

const ReviewsHeader = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  margin: 30px 0;
`;

const ReviewText = styled.textarea`
  font-family: var(--font-body);
  height: 400px;
  margin: 10px 0;
  width: 700px;
`;

const ReviewWrapper = styled.div`
  padding: 0 20px;
`;

const StyledForm = styled.form`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
`;

const SubmitAndMessage = styled.div`
  align-items: center;
  display: flex;
`;

const SubmitButton = styled.button`
  background-color: var(--color-dark-green);
  border: none;
  border-radius: 5px;
  color: var(--color-light-beige);
  font-family: var(--font-body);
  font-size: 1rem;
  margin: 10px 0;
  padding: 10px;
  width: 100px;
  &:hover {
    background-color: var(--color-green);
    cursor: pointer;
  }
  &:disabled {
    background-color: lightgrey;
    cursor: not-allowed;
  }
`;

const SubmitMessage = styled.div`
  color: ${(props) => (props.typedReview.length > 500 ? "red" : "black")};
  margin: 0 20px;
`;

const TitleInput = styled.input`
  font-family: var(--font-body);
  margin: 10px 0;
  width: 700px;
`;

const Wrapper = styled.div`
  border: 2px solid black;
  margin: 40px 0;
`;
