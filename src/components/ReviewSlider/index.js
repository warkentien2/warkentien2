import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

function ReviewSlider() {
  const reviews = [
    {
      review: "Philip is approachable and gives detailed responses. He's encouraging and I'm happy with his support.",
      author: ""
    },
    {
      review: "Great reviewer! I hope I have another like him.",
      author: ""
    },
    {
      review: "Excellent job. All points have an explicit description and resource. Where is the name of this mentor or reviewer? Thanks, reviewer!",
      author: ""
    },
    {
      review: "Thanks for always giving me a super detailed answer, I truly appreciate it",
      author: ""
    },
    {
      review: "Many thanks for your review! I found it very motivational, helpful, and informative. I will do my best to apply your advice in the future. :-)",
      author: ""
    },
    {
      review: "His/Her attention to every little detail of my code was impeccable!",
      author: ""
    },
    {
      review: "Very detailed review, suggestions are clear and relevant to the code I wrote. The reviewer considered and reviewed on all my information. Excellent :)!",
      author: ""
    },
    {
      review: "I love it, I learned a lot from this correction. Thank you very much.",
      author: ""
    },
    {
      review: "BEST FEEDBACK <3 The reviewer shared podcasts, left great reviews, suggested improvements and even used a meme. Thanks for the review. It made my night.",
      author: ""
    },
    {
      review: "I was very impressed with how clear and didactic this review was! Way beyond my expectations :)",
      author: ""
    },
    {
      review: "Awesome and informative review. Learned a ton just from the review itself! Will definitely be applying these notes to improve my code's efficiency as I continue, thank you! :)",
      author: ""
    },
    {
      review: "Super constructive feedback - thank you so much :)",
      author: ""
    },
    {
      review: "Thanks so much, Philip! All respect for your kind reply and excellent explanation",
      author: "Marwa M."
    },
    {
      review: "Thank you so much for the review! I wasn't expecting this much feedback! It was very helpful and very supportive!",
      author: ""
    },
    {
      review: "Very detailed-oriented reviewer. I liked the feedback!",
      author: ""
    },
    {
      review: "Very demanding and challenges-setting review, as it should be! This will help me become a better professional. Thank you!",
      author: ""
    },
    {
      review: "Super detailed review :-)",
      author: ""
    },
    {
      review: "(Sic) My dude, you are such a kind person with great knowledge and high technical ability. You have supported me a lot.",
      author: "Abdelrahman M."
    },
    {
      review: "Thank you, Philip, for your time. I read all your notes which are so organized and clear to me ;) The game finally works fine! Thanks again for your support",
      author: "Marwa M."
    },
    {
      review: "I think I learned more from you than from the lessons in Udacity. Thank you!",
      author: "Marie Therese Y"
    },
    {
      review: "The reviewer was very thorough, suggesting improvements on even small things that I feel that they would be commonly overlooked",
      author: ""
    },
    {
      review: "This type of review is magnificent!",
      author: ""
    },
    {
      review: "This review alone is equivalent to taking multiple lessons. It's fascinating how the reviewer doesn't stick to the limited set of previously covered concepts, but still, the way he approaches the subject doesn't make me feel disappointed in myself. Instead, it motivates to study materials beyond the curriculum.",
      author: ""
    },
    {
      review: "Super well explained. I understood everything without any troubles. :)",
      author: ""
    },
    {
      review: "The review was great! All suggestions were extremely pertinent and added to my project.",
      author: ""
    },
    {
      review: "A great revision! I wasn't expecting all this care with the student, but was pleasantly surprised! Congratulations on this great work and thank you for the suggestions!",
      author: ""
    },
    {
      review: "Thank you very much!!! Your feedbacks are of immense help to my professional development.",
      author: ""
    },
    {
      review: "Excellent feedback. It's a pleasure to have you as a tutor! :)",
      author: ""
    },
    {
      review: "I was a little sad because of GIT... And, I decided to open my email. Awesome! I'm fascinated by how this review was made. I never thought that my project would be revised with so much detail. I'm also thrilled with the way you write! With the reviews and suggestions, I received revitalizing energy for my new path! Thanks a lot!",
      author: ""
    },
    {
      review: "Thorough code review, much appreciated! Thank you for the feedback.",
      author: ""
    },
    {
      review: "A can't thank you enough for these revisions. They hold so many useful and pertinent orientations.",
      author: ""
    },
    {
      review: "Excellent revision! I had no idea that it would be this good. This refueled my motivation to proceed with this course and find out what awaits me. Congratulations on such a great job!",
      author: ""
    },
    {
      review: "Great reviewer! Gave me some very important suggestions and has a great sense of humor :D",
      author: ""
    },
    {
      review: "Great revision! It is so great to receive feedback with this level of detail. Congratulations!",
      author: ""
    },
    {
      review: "Great revision, quite clear and objective. Thank you for recommending the podcasts and for all the improvement tips!",
      author: ""
    },
    {
      review: "Best review ever! Thanks for your reviews.",
      author: ""
    },
    {
      review: "I'm so very grateful to the reviewer for using simple terms in his revision, I was having some issues with this content, but now I understand! Such a loveable reviewer <3",
      author: ""
    },
    {
      review: "This revision exceeded all of my expectations. Very fast and thorough! Congratulations!",
      author: ""
    },
    {
      review: "Hi! Thank you very much for the very useful feedback! It's incredible how you pointed all my errors out! Now, I'm working on it one by one and it is, actually, working much better! Awesome review! Thank you!",
      author: "Sherry"
    },
    {
      review: "So good! To me, this revision was like a bonus lesson",
      author: ""
    },
    {
      review: "Best code review I had on Udacity! There were many excellent tips and you reinforced some core points that I hadn't even acknowledged how important they were! Plus, you added memes hhahahaha I'm still laughing! Thank you, keep it up!",
      author: ""
    },
    {
      review: "Hats off to your didactic and to the way you explained every required change. Praiseworthy interaction!",
      author: ""
    },
    {
      review: "I feel excited with the review, there was a clear response to issues I raised, clear instructions on how to make my code better and I appreciate the list of podcast given.",
      author: ""
    },
    {
      review: "Hey Philip, thanks, man!!! You are very patient and a good teacher. It's greatly appreciated. I pray many blessings your way!!! Thanks, man, you have no idea! Greatly appreciated!!!",
      author: "Ray H."
    },
    {
      review: "I appreciate everything my reviewer said. Their feedback was a big help in finishing every little detail about this assignment. So, thank you very much. :)",
      author: ""
    },
    {
      review: "Loved the quote from Neil deGrasse Tyson!",
      author: ""
    },
    {
      review: "Thanks for the heads up on things I can improve on, and for how positive the review was! I left feeling great while still knowing what I can do better, and that's a wonderful feeling.",
      author: ""
    }
  ]

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rows: 3,
    autoplay: true,
    autoplaySpeed: 15000
  };

  return (
    <div>
      <h3>Student Feedback</h3>
      <Slider {...settings}>
        {reviews.map((review, index) => {
          return (
            <blockquote key={index} style={{ width: '90%', border: '5px dotted green !important' }}>
              <p>“{ review.review }”</p>
              { review.author && (
                <cite>— {review.author}</cite>
              )}
            </blockquote>
          )
        })}
      </Slider>
    </div>
  );
}

export default ReviewSlider
