import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

function ReviewSlider({ windowSize }) {
  const reviews = [
    {
      review: "I think I learned more from you than from the lessons in Udacity. Thank you!",
      author: "Marie Therese Y",
      score: 10
    }, 
    {
      review: "Awesome! I'm fascinated by how this review was made. I never thought that my project would be revised in so much detail. I'm also thrilled with the way you write! With these reviews and suggestions, I received revitalizing energy for my new path! Thank you!",
      author: "",
      score: 10
    }, 
    {
      review: "Thanks so much, Philip! All respect for your kind reply and excellent explanation!",
      author: "Marwa M.",
      score: 10
    },  
    {
      review: "This review alone is equivalent to taking multiple lessons. It's fascinating how this review doesn't make me feel disappointed in myself. Instead, it motivates me to study materials beyond the curriculum.",
      author: "",
      score: 10
    }, 
    {
      review: "Loved the quote from Neil deGrasse Tyson!",
      author: "",
      score: 9
    }, 
    {
      review: "Excellent revision! I had no idea that it would be this good. This refueled my motivation to proceed with this course and find out what awaits me. Congratulations on such a great job!",
      author: "",
      score: 10
    }, 
    {
      review: "Many thanks for your review! I found it very motivational, helpful, and informative. I will do my best to apply your advice in the future. :-)",
      author: "",
      score: 10
    }, 
    {
      review: "Thanks for the heads up on things I can improve, and for how positive the review was! I left feeling great while still knowing what I can do better, and that's a wonderful feeling.",
      author: "",
      score: 10
    },
    {
      review: "Thanks for always giving me a super detailed answer, I truly appreciate it.",
      author: "",
      score: 9
    }, 
    {
      review: "Thank you, Philip, for your time. I read all your notes which are so organized and clear to me ;) The game finally works fine! Thanks again for your support.",
      author: "Marwa M.",
      score: 9
    }, 
    {
      review: "Very detailed review, suggestions are clear and relevant to the code I wrote. Excellent! :)",
      author: "",
      score: 9
    }, 
    {
      review: "Thank you so much for the review! I wasn't expecting this much feedback! It was very helpful and very supportive!",
      author: "",
      score: 9
    }, 
    {
      review: "Awesome and informative review. Learned a ton just from the review itself! Will definitely be applying these notes to improve my code's efficiency as I continue, thank you! :)",
      author: "",
      score: 9
    }, 
    {
      review: "The reviewer was very thorough, suggesting improvements on even small things that would be commonly overlooked.",
      author: "",
      score: 9
    }, 
    {
      review: "This type of review is magnificent!",
      author: "",
      score: 9
    }, 
    {
      review: "BEST FEEDBACK EVER <3! The reviewer shared podcasts, left great reviews, suggested improvements and even used a meme. Thanks for the review. It made my night!",
      author: "",
      score: 8
    }, 
    {
      review: "A great revision! I wasn't expecting all this care with the student, but was pleasantly surprised! Congratulations on this great work and thank you for the suggestions!",
      author: "",
      score: 9
    }, 
    {
      review: "A can't thank you enough for these revisions. They hold so many useful and pertinent orientations.",
      author: "",
      score: 9
    }, 
    {
      review: "So good! To me, this revision was like a bonus lesson.",
      author: "",
      score: 9
    }, 
    {
      review: "I feel excited with the review, there was a clear response to issues I raised, clear instructions on how to make my code better and I appreciate the list of podcast given.",
      author: "",
      score: 9
    }, 
    {
      review: "Philip is approachable and gives detailed responses. He's encouraging and I'm happy with his support.",
      author: "",
      score: 8
    }, 
    {
      review: "I love it, I learned a lot from this correction. Thank you very much.",
      author: "",
      score: 8
    }, 
    {
      review: "A very demanding and challenging review, as it should be! This will help me become a better professional. Thank you!",
      author: "",
      score: 8
    }, 
    {
      review: "Excellent feedback. It's a pleasure to have you as a tutor! :)",
      author: "",
      score: 8
    }, 
    {
      review: "Great reviewer! Gave me some very important suggestions and has a great sense of humor! :D",
      author: "",
      score: 8
    }, 
    {
      review: "Best code review I had on Udacity! There were many excellent tips and you reinforced some core points that I hadn't even acknowledged how important they were! Plus, you added memes hhahahaha I'm still laughing! Thank you, keep it up!",
      author: "",
      score: 8
    }, 
    {
      review: "Super well explained. I understood everything without any troubles. :)",
      author: "",
      score: 7
    }, 
    {
      review: "Hey Philip, thanks, man!!! You are very patient and a good teacher. It's greatly appreciated. I pray many blessings your way!!! Thanks, man, you have no idea! Greatly appreciated!!!",
      author: "Ray H.",
      score: 7
    }, 
    {
      review: "I was very impressed with how clear and didactic this review was! Way beyond my expectations! :)",
      author: "",
      score: 7
    }, 
    {
      review: "I'm so very grateful to the reviewer for using simple terms in his revision, I was having some issues with this content, but now I understand! Such a loveable reviewer. <3",
      author: "",
      score: 8
    }, 
    {
      review: "Thorough code review, much appreciated! Thank you for the feedback.",
      author: "",
      score: 7
    }, 
    {
      review: "Thank you very much!!! Your feedbacks are of immense help to my professional development.",
      author: "",
      score: 7
    }, 
    {
      review: "The review was great! All suggestions were extremely pertinent and added to my project.",
      author: "",
      score: 7
    }, 
    {
      review: "Great revision! It is so great to receive feedback with this level of detail. Congratulations!",
      author: "",
      score: 7
    }, 
    {
      review: "Great revision, quite clear and objective. Thank you for recommending the podcasts and for all the improvement tips!",
      author: "",
      score: 7
    }, 
    {
      review: "This revision exceeded all of my expectations. Very fast and thorough! Congratulations!",
      author: "",
      score: 7
    }, 
    {
      review: "Hats off to your didactic and to the way you explained every required change. Praiseworthy interaction!",
      author: "",
      score: 7
    }, 
    {
      review: "Hi! Thank you so much for this very useful feedback! It's incredible how you pointed out all my errors! Now, I'm working on them one by one and it is, actually, working much better! Awesome review! Thank you!",
      author: "Sherry",
      score: 5
    }, 
    {
      review: "Best review ever! Thanks for your reviews.",
      author: "",
      score: 6
    }, 
    {
      review: "Super constructive feedback - thank you so much! :)",
      author: "",
      score: 6
    }, 
    {
      review: "(Sic) My dude, you are such a kind person with great knowledge and high technical ability. You have supported me a lot.",
      author: "Abdelrahman M.",
      score: 5
    }, 
    {
      review: "Great reviewer! I hope I'll have others like him.",
      author: "",
      score: 5
    }
  ]

  const smallScreen = windowSize.width <= 940

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rows: smallScreen ? 2 : 3,
    autoplay: true,
    autoplaySpeed: 15000
  };

  return (
    <div className={`student-feedback__slider contain${smallScreen ? ' small-screen' : ''}`}>
      <h3>Student Feedback</h3>
      <Slider {...settings}>
        {reviews.map((review, index) => {
          return (
            <blockquote className="student-feedback__wrapper" key={index} style={{ width: '90%', border: '5px dotted green !important' }}>
              <p className="student-feedback">
                <span className="big">“</span>{ review.review }
                <cite className={`student-name${review.author ? '' : ' faint'}`}>— {review.author || 'Student'}</cite>
                <span className="big">”</span>
              </p>
            </blockquote>
          )
        })}
      </Slider>
    </div>
  );
}

export default ReviewSlider
