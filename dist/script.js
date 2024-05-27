console.clear();
const log = console.log;
import { faker } from "https://esm.sh/@faker-js/faker@v8.4.0";

function $(selector) {
  return document.querySelector(selector);
}

// ========= Bringing in HTML elements =========

const divNew = $(".new");
const btnComment = $(".btn-comment");
const btnMessage = $(".btn-message");
const btnBookmark = $(".btn-bookmark");

const btnOtherLikes = $(".others-button");
const btnComments = $(".cont-comments");
const btnBackLikes = $(".back-button-likes");
const btnBackComments = $(".back-button-comments");

const pageMain = $(".container-page-main");
const pageUserLikes = $(".container-page-user-likes");
const pageComments = $(".container-page-comments");

const likesList = $(".ul-likes");
const commentsList = $(".ul-comments");

const likesUsers = [];
const commentsUsers = [];
const repliesUsers = [];

// pageUserLikes.classList.add('hidden');
// pageComments.classList.add('hidden');

let min = 8;
let max = 10;

// ========= Generate Random Number =========

function generateRandomNumber() {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const randomNumber = generateRandomNumber();
// log (randomNumber)

// ========= Post, Likes, Comments Objects =========

function createPost() {
  return {
    username: faker.internet.userName(),
    userLocation: `${faker.location.city()}, ${faker.location.country()}`,
    userPicture: faker.image.avatar(),
    postImage: `url('${faker.image.url()}')`,
    postDescript: faker.word.words({ count: { min: 2, max: 4 } }),
    postIsLiked: faker.datatype.boolean(),
    postNumOfLikes: generateRandomNumber(),
    postCommYN: faker.datatype.boolean(),
    date: `${faker.number.int({ min: 1, max: 30 })}, ${faker.date.month()}`
  };
}
const createdPost = createPost();

function createLikeUser() {
  return {
    username: faker.internet.userName(),
    name: faker.person.fullName(),
    userPicture: faker.image.avatar(),
    userIsFollowed: faker.datatype.boolean()
  };
}
const createdLikeUser = createLikeUser();

function createComment() {
  return {
    username: faker.internet.userName(),
    userPicture: faker.image.avatar(),
    comm: faker.word.words({ count: { min: 2, max: 6 } }),
    commIsLiked: faker.datatype.boolean(),
    commNumOfLikes: generateRandomNumber(),
    repliesYN: faker.datatype.boolean(),
    replies: []
  };
}
const createdComment = createComment();

function createReply() {
  return {
    username: faker.internet.userName(),
    userPicture: faker.image.avatar(),
    comm: faker.word.words({ count: { min: 2, max: 4 } }),
    commIsLiked: faker.datatype.boolean(),
    commNumOfLikes: generateRandomNumber(),
    repliesYN: faker.datatype.boolean()
  };
}
const createdReply = createReply();

// log(createdReply)

// ========= Utility functions =========

function $$(type, htmlClass, text) {
  const element = document.createElement(type);
  element.classList.add(htmlClass);
  if (text) {
    element.innerText = text;
  }
  return element;
}

// ========= Post Page =========
// log(createdPost);

function renderPost(post1, post2) {
  const p_imgUser = $(
    ".container-page-main .cont-user .cont-user-left .cont-user-picture .img-user"
  );
  const p_contUserName = $(
    ".container-page-main .cont-user .cont-user-left .cont-user-info .cont-user-name"
  );
  const p_contUserLocation = $(
    ".container-page-main .cont-user .cont-user-left .cont-user-info .cont-user-location"
  );
  const p_contUserPostImage = $(".container-page-main .cont-post");
  const p_contUserPostLikes = $(".container-page-main .cont-data .cont-likes");
  const p_contUserPostDescription = $(
    ".container-page-main .cont-data .cont-description"
  );
  const p_contUserPostComments = $(
    ".container-page-main .cont-data .cont-comments"
  );
  const p_contUserPostDate = $(".container-page-main .cont-data .cont-date");
  const likedByText = document.createTextNode(`Liked by ${post2.username} and `);
  const othersButton = $$("button");
  othersButton.classList.add("others-button");
  othersButton.textContent = `${randomNumber} others`;
  
  p_imgUser.src = post1.userPicture;
  p_contUserName.innerText = post1.username;
  p_contUserLocation.innerText = post1.userLocation;
  p_contUserPostImage.style.backgroundImage = post1.postImage;
  
  p_contUserPostLikes.appendChild(likedByText);
  p_contUserPostLikes.appendChild(othersButton);
  p_contUserPostDescription.innerText = `${post1.username} ${post1.postDescript}`;
  p_contUserPostComments.innerText = `View all ${randomNumber} comments`;
  p_contUserPostDate.innerText = post1.date;
}
renderPost(createdPost, createdLikeUser);

// ========= Likes Page =========

for (let i = 0; i <= randomNumber; i++) {
  likesUsers.push(createLikeUser());
}
// log(likesUsers);

function renderLikeUser(likesUsers) {
  likesUsers.forEach((user) => {
    const li = $$("li", "like-item");
    const contUserLeft = $$("div", "cont-user-left");
    const contUserRight = $$("div", "cont-user-right");
    const contUserPicture = $$("div", "cont-user-picture");
    const contUserInfo = $$("div", "cont-user-info");
    const contUserName = $$("div", "cont-user-name", user.username);
    const contUserFullname = $$("div", "cont-user-fullname", user.name);
    const followButton = $$("button", "follow-button", "Follow");
    const imgUser = $$("img", "img-user");

    imgUser.src = user.userPicture;
    contUserPicture.appendChild(imgUser);

    contUserInfo.appendChild(contUserName);
    contUserInfo.appendChild(contUserFullname);

    contUserLeft.appendChild(contUserPicture);
    contUserLeft.appendChild(contUserInfo);

    contUserRight.appendChild(followButton);

    li.appendChild(contUserLeft);
    li.appendChild(contUserRight);

    likesList.appendChild(li);
  });
}
renderLikeUser(likesUsers);

// ========= Replies =========

function createReplies() {
  const numOfReplies = faker.number.int({ min: 0, max: 5 });
  const replyElements = [];
  // log(numOfReplies)
  for (let i = 0; i <= 4; i++) {
    repliesUsers.push(createReply());
    // log(repliesUsers);
  }

  function renderReply(repliesUsers) {
    repliesUsers.forEach((reply) => {
      const li = $$("li", "reply-item");
      const contUserLeft = $$("div", "cont-user-left");
      const contUserRight = $$("div", "cont-user-right");
      const contUserPicture = $$("div", "cont-user-picture");
      const contUserInfo = $$("div", "cont-user-info");
      const contUserName = $$("div", "cont-user-name-c", reply.username);
      const contUserComm = $$("div", "cont-user-comm-c", reply.comm);

      const likeButton = $$("button", "btn-like-small");
      likeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16" style="width: 80%; height: 80%;">
              <path id='empty-heart-small' d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
              <path id='filled-heart-small' fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
            </svg>`;
      const imgUser = $$("img", "img-user");

      imgUser.src = reply.userPicture;
      contUserPicture.appendChild(imgUser);

      contUserInfo.appendChild(contUserName);
      contUserInfo.appendChild(contUserComm);

      contUserLeft.appendChild(contUserPicture);
      contUserLeft.appendChild(contUserInfo);

      contUserRight.appendChild(likeButton);

      li.appendChild(contUserLeft);
      li.appendChild(contUserRight);
      
      replyElements.push(li);
    });
    return replyElements;
  }
  return renderReply(repliesUsers);
}
const replies = createReplies();

// log(replies)

// ========= Comments Page =========

for (let i = 0; i <= randomNumber; i++) {
  // log (randomNumber)
  commentsUsers.push(createComment());
}
// log(commentsUsers);

function renderComment(commentsUsers) {
  commentsUsers.forEach((comment) => {
    const li = $$("li", "comment-item");
    const contUserLeft = $$("div", "cont-user-left");
    const contUserRight = $$("div", "cont-user-right");
    const contUserPicture = $$("div", "cont-user-picture");
    const contUserInfo = $$("div", "cont-user-info");
    const contUserName = $$("div", "cont-user-name-c", comment.username);
    const contUserComm = $$("div", "cont-user-comm-c", comment.comm);

    const replyButton = $$("button", "reply-button-c", "Reply");
    const viewReplies = $$(
      "button",
      "view-replies-c",
      `View ${randomNumber} replies`
    );
    const repliesContainer = $$("ul", "replies-container");

    const likeButton = $$("button", "btn-like-small");
    likeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16" style="width: 80%; height: 80%;">
              <path id='empty-heart-small' d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
              <path id='filled-heart-small' fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
            </svg>`;
    const imgUser = $$("img", "img-user");

    imgUser.src = comment.userPicture;
    contUserPicture.appendChild(imgUser);

    replies.forEach((reply) => {
  repliesContainer.appendChild(reply);
});
    
    contUserInfo.appendChild(contUserName);
    contUserInfo.appendChild(contUserComm);
    contUserInfo.appendChild(replyButton);
    contUserInfo.appendChild(viewReplies);
    contUserInfo.appendChild(repliesContainer);

    contUserLeft.appendChild(contUserPicture);
    contUserLeft.appendChild(contUserInfo);

    contUserRight.appendChild(likeButton);

    li.appendChild(contUserLeft);
    li.appendChild(contUserRight);
    // log(li)
    commentsList.appendChild(li);
  });
}
renderComment(commentsUsers);

// ========= Buttons - Events Listeners =========

const btnLikes = document.querySelectorAll(".btn-like");
const btnLikesSmall = document.querySelectorAll(".btn-like-small");
const btnFollows = document.querySelectorAll(".follow-button");

function toggleFollowStatus() {
  if (this.textContent === "Follow") {
    this.textContent = "Following";
    this.classList.add("following-button");
  } else {
    this.textContent = "Follow";
    this.classList.remove("following-button");
  }
}

btnFollows.forEach((btnFollow) => {
  btnFollow.addEventListener("click", toggleFollowStatus);
});

btnLikes.forEach((btnLike) => {
  btnLike.addEventListener("click", function () {
    this.classList.toggle("clicked");
  });
});

btnLikesSmall.forEach((btnLikeSmall) => {
  btnLikeSmall.addEventListener("click", function () {
    this.classList.toggle("clicked");
  });
});

btnComment.addEventListener("mousedown", function () {
  this.classList.add("clicked");
});
btnComment.addEventListener("mouseup", function () {
  setTimeout(() => {
    this.classList.remove("clicked");
  }, 50);
});

btnMessage.addEventListener("mousedown", function () {
  this.classList.add("clicked");
});
btnMessage.addEventListener("mouseup", function () {
  setTimeout(() => {
    this.classList.remove("clicked");
  }, 50);
});

btnBookmark.addEventListener("click", function () {
  this.classList.toggle("clicked");
});

// -------------------------------------------------------

//   btnOtherLikes.addEventListener("click", function () {
//     this.classList.toggle("clicked");
//   });

//  btnComments.addEventListener("click", function () {
//     this.classList.toggle("clicked");
//   });

//  btnBackLikes.addEventListener("click", function () {
//     this.classList.toggle("clicked");
//   });

//  btnBackComments.addEventListener("click", function () {
//     this.classList.toggle("clicked");
//   });





// follow button -v-

// search user likes
// Others button
// 6 Comments button

// create replies
// Add Replies button

// Add comment

// click link to Comments
// click link to Likes

// list of posts







// function createUser() {
//   return {
//     //      Person specific Info
//     username: faker.internet.userName(),
//     name: faker.person.fullName(),
//     userPicture: faker.image.avatar(),
//     userLocation: `${faker.location.city()}, ${faker.location.country()}`,
//     userIsFollowed: faker.datatype.boolean(),
//     //      Post specific Info
//     postImage: faker.image.url(),
//     postDescript: faker.word.words({ count: { min: 3, max: 5 } }),
//     postIsLiked: faker.datatype.boolean(),
//     postNumOfLikes: generateRandomNumber(),
//     postCommYN: faker.datatype.boolean(),
//     //      Comment specific Info
//     comm: faker.word.words({ count: { min: 3, max: 10 } }),
//     commIsLiked: faker.datatype.boolean(),
//     commNumOfLikes: generateRandomNumber(),
//     repliesYN: faker.datatype.boolean(),
//     replies: []
//   };
// }
// const user = createUser();
// log(user);







// const numOfReplies = faker.number.int({ min: 0, max: 5 });
// // log(numOfReplies)
// for (let i = 0; i <= 1; i++) {
//   repliesUsers.push(createReply());
// }
// // log(repliesUsers);

// const ulReplies = $$("ul", "ul-replies");

// function renderReply(repliesUsers) {

//   repliesUsers.forEach((reply) => {
//     const li = $$("li", "reply-item");
//     const contUserLeft = $$("div", "cont-user-left");
//     const contUserRight = $$("div", "cont-user-right");
//     const contUserPicture = $$("div", "cont-user-picture");
//     const contUserInfo = $$("div", "cont-user-info");
//     const contUserName = $$("div", "cont-user-name-c", reply.username);
//     const contUserComm = $$("div", "cont-user-comm-c", reply.comm);

//     const likeButton = $$("button", "btn-like-small");
//     likeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16" style="width: 80%; height: 80%;">
//               <path id='empty-heart-small' d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
//               <path id='filled-heart-small' fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
//             </svg>`;
//     const imgUser = $$("img", "img-user");

//     imgUser.src = reply.userPicture;
//     contUserPicture.appendChild(imgUser);

//     contUserInfo.appendChild(contUserName);
//     contUserInfo.appendChild(contUserComm);

//     contUserLeft.appendChild(contUserPicture);
//     contUserLeft.appendChild(contUserInfo);

//     // likeButton.appendChild(likeButtonSVG);
//     contUserRight.appendChild(likeButton);

//     li.appendChild(contUserLeft);
//     li.appendChild(contUserRight);

//     ulReplies.appendChild(li);

//   });
//     // console.log(ulReplies);
//     return ulReplies;
// }
// renderReply(repliesUsers);

// divNew.appendChild(renderReply(repliesUsers));

// ========================================================================


// ========= Generating Replies =========

// function pushReplies(){
//     for (let i = 0; i < 4; i++) {
//     repliesUsers.push(createReply())};
//     return repliesUsers;
// }

// log(pushReplies());

// randNumOfPushRepArr
//     log(repliesUsers);

// function renderLikeUser(likesUsers) {
//   likesUsers.forEach((user) => {

// const pushReplies = () => {
//   for (let i = 0; i <= faker.number.int({ min: 0, max: 5 }); i++) {
//     repliesUsers.push(createReply());
//     log(repliesUsers);
//   }
// };

// pushReplies();
// // log(repliesUsers)

// function pushReplies (repliesUsers) {
// repliesUsers.forEach
// }