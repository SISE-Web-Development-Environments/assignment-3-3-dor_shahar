import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/favorites",
    name: "favorites",
    component: () => import("./pages/FavoritesPage")
  },
  {
    path: "/myRecipes",
    name: "my_recipes",
    component: () => import("./pages/MyRecipesPage")
  },
  {
    path: "/familyRecipes",
    name: "family_recipes",
    component: () => import("./pages/FamilyRecipesPage")
  },  
  {
    path: "/myRecipe/:recipeId",
    name: "my_recipe",
    component: () => import("./pages/UserRecipeViewPage")
  },  
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage")
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
