import View from "../View.js"
import icons from "url:../../../img/icons.svg"

class BookmarkView extends View {
    _parentEl = ".bookmarks__list"

    _createHtml(result) {
        //preview__link--active
        // console.log(result)
        // console.log(result.bookmarks.length)

        //kiểm tra nếu đọ dài  bookmarks < 1 thì trả về thông báo đã hết để render
        if (result.bookmarks.length < 1) {
            return `
            <div class="message">
                <div>
                    <svg>
                        <use href="${icons}#icon-smile"></use>
                    </svg>
                </div>
                <p>
                    No bookmarks yet. Find a nice recipe
                    and bookmark it :)
                </p>
            </div>
            `
        }
        return result.bookmarks
            .map((e) => {
                return `
                <li class="preview ${
                    e.id === result.recipe.id ? "preview__link--active" : ""
                }" data-id="${e.id}">
                    <a
                        class="preview__link "
                        href="#${e.id}"
                    >
                        <figure class="preview__fig">
                            <img src="${e.img}" alt="Test" />
                        </figure>
                        <div class="preview__data">
                            <h4 class="preview__title">
                            ${e.title}
                            </h4>
                            <p class="preview__publisher">
                            ${e.publisher}
                            </p>
                            <div class="preview__user-generated">
                                <svg>
                                    <use
                                        href="${icons}#icon-user"
                                    ></use>
                                </svg>
                            </div>
                        </div>
                    </a>
                </li>
                `
            })
            .join("")
    }
}

export default new BookmarkView()
