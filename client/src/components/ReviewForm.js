import styled from "styled-components";

const ReviewForm = ()=>{
    return (
        <Wrapper>
            <ReviewWrapper>
                <ReviewsHeader>Leave a review</ReviewsHeader>
                <StyledForm>
                    <TitleInput placeholder="Title"></TitleInput>
                    <RatingWrapper>
                        <Rating>
                            <RatingTitle>⭐</RatingTitle>
                            <RatingCheckbox type="radio" name="rating"/>
                        </Rating>
                        <Rating>
                            <RatingTitle>⭐⭐</RatingTitle>
                            <RatingCheckbox type="radio" name="rating"/>
                        </Rating>
                        <Rating>
                            <RatingTitle>⭐⭐⭐</RatingTitle>
                            <RatingCheckbox type="radio" name="rating"/>
                        </Rating>
                        <Rating>
                            <RatingTitle>⭐⭐⭐⭐</RatingTitle>
                            <RatingCheckbox type="radio" name="rating"/>
                        </Rating>
                        <Rating>
                            <RatingTitle>⭐⭐⭐⭐⭐</RatingTitle>
                            <RatingCheckbox type="radio" name="rating"/>
                        </Rating>
                    </RatingWrapper>
                    <ReviewText placeholder="Your review here..."></ReviewText>
                    <SubmitButton>Submit</SubmitButton>
                </StyledForm>                
            </ReviewWrapper>
        </Wrapper>
    );
}

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

const RatingCheckbox = styled.input`

`;

const RatingTitle = styled.div`

`;

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
    &:hover{
        background-color: var(--color-green);
        cursor: pointer;
    }
`;

const TitleInput = styled.input`
    font-family: var(--font-body);
    margin: 10px 0;
    width: 700px;
`;

const Wrapper = styled.div`
    border: 2px solid black;
    margin: 50px 0;
`;

