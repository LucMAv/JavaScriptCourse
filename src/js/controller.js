import * as model from "./model.js";
import { MODAL_CLOSE_SEC } from "./config.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";
import View from "./views/view.js";

const recipeContainer = document.querySelector(".recipe");

// * https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); // window = window, location = url, hash = id
    // console.log(id);

    if (!id) return;
    recipeView.renderSpinner();
    // 0. results view to mark selected search results
    resultsView.update(model.getSearchResultsPage());

    // 3. updating bookmarksView
    bookmarksView.update(model.state.bookmarks);

    // 1. loading recipe
    await model.loadRecipe(id);

    // 2. rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1. get search query
    const query = searchView.getQuery();
    if (!query) return;

    //2. load search results
    await model.loadSearchResults(query);

    // 3. Render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // 4. render inital pagination btns
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const controlPagination = function (goToPage) {
  // 3. Render New results
  // resultsView.render(model.state.search.results);
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 4. render New pagination btns
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1. add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // 2. update recipe view
  recipeView.update(model.state.recipe);
  // 3. render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // show loading spinner
    addRecipeView.renderSpinner();
    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // render recipe
    recipeView.render(model.state.recipe);

    // success message
    addRecipeView.renderMessage();

    // render bookmark view
    bookmarksView.render(model.state.bookmarks); // render not bookmark because we dont want to update the state

    // change id in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`)

    // close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.log(err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
