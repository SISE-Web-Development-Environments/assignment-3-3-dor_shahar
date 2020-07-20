<template>
  <div class="container">
    <h1 class="h1">about</h1>
    <br />
    <img
      class="pic"
      src="https://scontent.ftlv1-2.fna.fbcdn.net/v/t1.0-9/18527864_10209418169871347_75035092917940044_n.jpg?_nc_cat=103&_nc_sid=09cbfe&_nc_ohc=-jpHOFrb-5UAX9A-L4m&_nc_ht=scontent.ftlv1-2.fna&oh=8c278a0d5135a77dfbe3abef1e49d45e&oe=5F3B6B6C"
    />
    <img
      class="pic"
      src="https://scontent.ftlv1-2.fna.fbcdn.net/v/t1.0-9/46329926_10217900016915965_4769130336858669056_o.jpg?_nc_cat=110&_nc_sid=a4a2d7&_nc_ohc=e8etgAapqWwAX_njWhV&_nc_ht=scontent.ftlv1-2.fna&oh=9a359699f91d70610a8c6f680568209f&oe=5F3C68C2"
    />
    <div id="text">
      We are a couple of students for Information and Software Engineering at Ben Gurion University.<br>
      We built this site as a part of a school project. This site uses an api request to an outsource to get most of the recipe details,
      and rest from a pirvate data base. <br>
      The site design idea is to give the user a comfortable and elegant experience.<br>
      We hope to see you here again!
    </div>
    <div id="mainPageLink">
      <router-link id="link" to="/" exact>Return to the Main Page</router-link>
    </div>
  </div>
</template>

<style scoped>
@import "../scss/main-container.scss";

.pic {
  margin-left: 3%;
  margin-right: 3%;
  width: 25%;
}

#text {
  margin-top: 50px;
  margin-left: 50px;
  margin-right: 50px;
  font-size: 25px;
  font-weight: bold;
  font-family: "Indie Flower", cursive;
}

#mainPageLink {
  margin: auto;
  margin-top: 50px;
  height: 50px;
}

#link {
  color: #17a2b8;
  font-weight: bold;
  font-size: 22px;
}
</style>
