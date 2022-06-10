import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import moment from "moment";
import { useContext, useState } from "react";
import { FilterContext } from "./FilterContext";
import { FiCamera } from "react-icons/fi"
import ReCAPTCHA from "react-google-recaptcha";
const { REACT_APP_SITEKEY, REACT_APP_CLOUDNAME, REACT_APP_UPLOAD_PRESET } =
  process.env;
const { v4: uuidv4 } = require("uuid");

const ReviewForm = ({ queriedCampsite }) => {
  const { user, isAuthenticated } = useAuth0();
  const { postAdded, setPostAdded } = useContext(FilterContext);
  const postingUser = isAuthenticated ? user : { sub: "Guest", name: "Guest", nickname: "Guest" };
  const [statusMessage, setStatusMessage] = useState("");
  const [typedReview, setTypedReview] = useState("");
  const [postSending, setPostSending] = useState(false);
  const [photoUploadSuccess, setPhotoUploadSuccess] = useState(null);
  const [photoUploadStatusMessage, setPhotoUploadStatusMessage] = useState("");
  let id = uuidv4();

  const changeHandler = (e) => {
    setTypedReview(e.target.value);
    setStatusMessage(500 - e.target.value.length);
  };

  const photoUploadWidget = (e) => {
    e.preventDefault();
    setPhotoUploadSuccess(null);
    window.cloudinary.openUploadWidget(
      {
        cloudName: REACT_APP_CLOUDNAME,
        uploadPreset: REACT_APP_UPLOAD_PRESET,
        sources: [
          "local",
          "url",
          "camera",
          "google_drive",
          "facebook",
          "dropbox",
          "instagram",
          "shutterstock",
        ],
        showAdvancedOptions: true,
        cropping: true,
        multiple: false,
        defaultSource: "local",
        styles: {
          palette: {
            window: "#406343",
            windowBorder: "#406343",
            tabIcon: "#F3EFCC",
            menuIcons: "#F3EFCC",
            textDark: "#000000",
            textLight: "#FFFFFF",
            link: "#0078FF",
            action: "#FF620C",
            inactiveTabIcon: "#000000",
            error: "#F44235",
            inProgress: "#0078FF",
            complete: "#20B832",
            sourceBg: "#F3EFCC"
        },
        fonts: {
          default: null,
          "'IBM Plex Sans', sans-serif": {
              url: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@200;300;400&display=swap",
              active: true
          }
      },
        },
      },
      (err, info) => {
        if (!err && info.event === "success") {
          setPhotoUploadSuccess(info.info);
          setPhotoUploadStatusMessage("Photo successfully uploaded!");
        }
      }
    );
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
        captcha: e.target[7].value,
        user: postingUser.sub,
        name: postingUser.name,
        nickname: postingUser.nickname,
        time: moment().format("MMMM Do YYYY, h:mm:ss a"),
        media: photoUploadSuccess !== null ? photoUploadSuccess : null,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPostSending(false);
        if (data.status === 200) {
          id = uuidv4();
          setStatusMessage("Review successfully posted!");
          setPostAdded(!postAdded);
        } else {
          console.log(data);
          setStatusMessage("Please validate with reCAPTCHA.");
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
          <div>
            <ReCAPTCHA required sitekey={REACT_APP_SITEKEY} />
          </div>
          <SubmitAndMessage>
            <ButtonWrapper>
            <SubmitButton onClick={photoUploadWidget}>
              <div>Upload photos</div> <FiCamera style={{marginLeft: "7px"}}/>
            </SubmitButton>
            <div style={{margin: "0 20px"}}>
                {photoUploadStatusMessage}
              </div>              
            </ButtonWrapper>

            <ButtonWrapper>
              <SubmitButton
                type="submit"
                disabled={postSending || typedReview.length > 500}
              >
                {postSending ? "Sending..." : "Submit"}
              </SubmitButton>
              <SubmitMessage typedReview={typedReview}>
                {statusMessage}
              </SubmitMessage>
            </ButtonWrapper>
          </SubmitAndMessage>
        </StyledForm>
      </ReviewWrapper>
    </Wrapper>
  );
};

export default ReviewForm;

const ButtonWrapper = styled.div`
  align-items: center;
  display: flex;
`;

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
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 5px 0;
`;

const SubmitButton = styled.button`
  align-items: center;
  background-color: var(--color-dark-green);
  border: none;
  border-radius: 5px;
  color: var(--color-light-beige);
  display: flex;
  font-family: var(--font-body);
  font-size: 1rem;
  justify-content: center;
  padding: 10px;
  width: 175px;
  &:hover {
    background-color: var(--color-green);
    cursor: pointer;
  }
  &:disabled {
    background-color: lightgrey;
    cursor: not-allowed;
  }
  &:first-of-type{
    margin: 5px 0;
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
  margin: 40px 75px;
  padding-right: 40px;
  width: 80%;
`;
