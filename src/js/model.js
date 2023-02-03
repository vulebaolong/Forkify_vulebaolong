import { API_KEY, PER_PAGE } from "./config.js"
import { getJSON, log } from "./helper"

export const state = {
    recipe: {},
    sreach: {
        query: "",
        result: [],
        page: 1,
        perPage: PER_PAGE,
    },
    bookmarks: [],
}

export const loadRecipe = async function (id) {
    try {
        const data = await getJSON(`${API_KEY}${id}`)
        // console.log(data)
        let { recipe } = data
        recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            source: recipe.source_url,
            img: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
        }

        //kiểm tra từng id trong mảng bookmark có bằng với ia trong recipe không
        //nếu có tạo key bookmarked = true
        if (state.bookmarks.some((e) => e.id === recipe.id)) {
            recipe.bookmarked = true
        }
        state.recipe = recipe

        log("loadRecipe=> fetch và lưu recipe vào state", state)
    } catch (error) {
        // window.location.reload()
        console.error(error)
        throw error
    }
}

export const loadSreach = async function (query) {
    try {
        //https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}
        const data = await getJSON(`${API_KEY}?search=${query}`)
        let { recipes } = data

        //recipes là falsse HOẶC (recipes không phải arr VÀ lenght ===0)
        if (!recipes || (Array.isArray(recipes) && recipes.length === 0)) {
            throw "Không tìm thấy kết quả"
        }

        const recipesArr = recipes.map((e) => {
            return {
                id: e.id,
                img: e.image_url,
                publisher: e.publisher,
                title: e.title,
            }
        })
        state.sreach.result = recipesArr
        state.sreach.page = 1

        log(
            "loadSreach=> fetch lấy kết quả đã search lưu vào state.sreach.result",
            state
        )
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const resultSreachPage = function (page = state.sreach.page) {
    state.sreach.page = page

    log("resultSreachPage => lưu page vào state.sreach.page", state)

    const start = (page - 1) * PER_PAGE //0 10
    const end = page * PER_PAGE - 1 //9 19
    const newState = state.sreach.result.slice(start, end)
    return newState
}

export const updateServings = function (servingGoto) {
    if (servingGoto < 1) return
    //new ingredients = ingredient / servings * servingGoto
    state.recipe.ingredients.forEach((ing) => {
        ing.quantity = (ing.quantity / state.recipe.servings) * servingGoto
    })
    state.recipe.servings = servingGoto
    log(
        "updateServings => lưu servingGoto vào state.recipe.servings để goto lần sau",
        state
    )
}

export const addBookMark = function (recipe) {
    state.recipe.bookmarked = true
    log("addBookMark => lưu true vào state.recipe.bookmarked", state)

    const isBookMark = state.bookmarks.some((e) => e.id === recipe.id)
    if (!isBookMark) {
        //format lại ít dữ liêu hơn để lưu vào bookmarks
        const newRecipe = {
            id: recipe.id,
            img: recipe.img,
            title: recipe.title,
            publisher: recipe.publisher,
        }
        state.bookmarks.push(newRecipe)
        log("addBookMark => lưu recipe vào state.bookmarks ", state)
    }

    //lưu bookmarks vào LocalStorage
    const newDataBookmark = {
        bookmarks: state.bookmarks,
        recipe: { id: state.recipe.id, bookmarked: state.recipe.bookmarked },
    }
    setLocalStorage("bookmarks", newDataBookmark)
}

export const deleteBookMark = function (recipe) {
    const bookmarkIndex = state.bookmarks.findIndex((e) => e.id === recipe.id)
    state.bookmarks.splice(bookmarkIndex, 1)
    log("deleteBookMark => xóa repice trong state.bookmarks", state)

    state.recipe.bookmarked = false
    log("addBookMark => lưu false vào state.recipe.bookmarked", state)

    //lưu bookmarks vào LocalStorage
    const newDataBookmark = {
        bookmarks: state.bookmarks,
        recipe: { id: state.recipe.id, bookmarked: state.recipe.bookmarked },
    }
    setLocalStorage("bookmarks", newDataBookmark)
}

export const activePreview = function (id) {
    const handleActivePreview = function (parent) {
        const previewActiveResulEL = parent.querySelector(
            ".preview__link--active"
        )
        previewActiveResulEL?.classList.remove("preview__link--active")
        // const id = state.recipe.id
        const curentResultEL = parent.querySelector(`li[data-id="${id}"]`)
        curentResultEL?.classList.add("preview__link--active")
    }

    // bên khung result
    const resultEL = document.querySelector(".results")
    handleActivePreview(resultEL)

    //bên khung bookmark
    const bookmarksListEl = document.querySelector(".bookmarks__list")
    handleActivePreview(bookmarksListEl)
}

export const setLocalStorage = function (key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}

export const getLocalStorage = function (key) {
    let data = localStorage.getItem(key)

    if (!data) return
    let obj = JSON.parse(data)
    return obj
}
