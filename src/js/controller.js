import * as model from "./model.js"

import RecipeView from "./View/recipeView/recipeView.js"
import IngredientsView from "./View/recipeView/ingredientsView.js"
import RecipeInfoButtons from "./View/recipeView/recipeInfoButtons.js"
import BookMarkButton from "./View/recipeView/bookMarkButton.js"
import BookmarkView from "./View/recipeView/bookMarkView.js"
import fromRepice from "./View/recipeView/fromRepice.js"

import SreachView from "./View/sreachView.js"
import ResultSreach from "./View/resultSreach.js"
import PaginationView from "./View/paginationView.js"

import "core-js/stable"
import "regenerator-runtime/runtime"

// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////

const controlRecipe = async function () {
    try {
        const id = window.location.hash.slice(1)
        if (!id) return

        //lấy id của recipe sẽ được render bên dưới để active Preview 2 khung
        //khung resultSreach và khung bookmark nếu có
        //active sớm trước khi loadRecipe không sẽ gây ra hiệu ứng chậm
        model.activePreview(id)

        //render ra loading
        RecipeView.renderSpinner()

        //vào model để fetch lấy dữ liệu lưu vào state
        await model.loadRecipe(id)

        //sau khi lưu data vào state, dùng state đó đưa vào RecipeView render
        // ở render dùng data đưa vào để tạo HTML insert vào thẻ cha
        RecipeView.render(model.state.recipe)

        //lắng nghe nút bookmark khi loadRecipe
        BookMarkButton.addEventListen(controlBookMark)

        // //reder nút bookmart
        // console.log(model.state.recipe)
        // BookMarkButton.render(model.state.recipe)
    } catch (error) {
        console.error(error)
        RecipeView.renderMessenger(error)
    }
}

const controlSreach = async function () {
    try {
        //lấy value của ô input search
        const valueinputEl = SreachView.getValueinputEl()

        //render ra loading
        ResultSreach.renderSpinner()

        //vào model để fetch lấy dữ liệu lưu vào state
        await model.loadSreach(valueinputEl)

        //sau khi lưu data vào state, dùng state đó đưa vào ResultSreach render
        ResultSreach.render(model.resultSreachPage())

        //render pagination
        PaginationView.render(model.state.sreach)
    } catch (error) {
        console.error(error)
        ResultSreach.renderMessenger(error)
    }
}

const controlPagination = function (goToPage) {
    //sau khi lưu data vào state, dùng state đó đưa vào ResultSreach render
    ResultSreach.render(model.resultSreachPage(+goToPage))

    //render pagination
    PaginationView.render(model.state.sreach)
}

const controlServing = function (servingGoto) {
    //chay logic của servings và lưu sate
    model.updateServings(servingGoto)

    //render IngredientsView
    IngredientsView.render(model.state.recipe)

    //render SERVINGS
    IngredientsView.renderText(
        model.state.recipe.servings,
        ".recipe__info-data--people"
    )

    //render button
    RecipeInfoButtons.render(model.state.recipe)
}

const controlBookMark = function (e) {
    //add / delete bookmark
    const isBookmark = model.state.recipe.bookmarked

    if (!isBookmark) {
        model.addBookMark(model.state.recipe)
    }
    if (isBookmark) {
        model.deleteBookMark(model.state.recipe)
    }

    //reder nút bookmart
    BookMarkButton.render(model.state.recipe)

    //render lại khung bookmark
    BookmarkView.render(model.state)
}

const controlfromRepice = function (data) {
    console.log(123)
    console.log(data)
}

const init = function () {
    //get data localStorage
    const data = model.getLocalStorage("bookmarks")
    //nếu data.bookmarks không có gì thì không ren der
    if (data?.bookmarks.length > 0) {
        //lấy data.bookmarks trong localStorage lưu vào state.bookmarks
        model.state.bookmarks = data.bookmarks
        //lấy data.recipe.bookmarked trong localStorage lưu vào state.recipe.bookmarked
        model.state.recipe.bookmarked = data.recipe.bookmarked
        //render lại khung bookmark
        BookmarkView.render(model.state)
    }

    //lắng nghe "hashchange", "load" để chay controlRecipe
    RecipeView.addEventRender(controlRecipe)

    //lắng nghe click btn điều chỉnh khẩu phần ăn
    RecipeView.addEventListen(controlServing)

    //lắng nghe khi submit from sreach
    SreachView.addEventSreach(controlSreach)

    // lắng nghe click chuyển trang
    PaginationView.addEventPagination(controlPagination)

    // lắng nghe upload from recipe
    fromRepice.addEventListUpLoad(controlfromRepice)
}

init()
