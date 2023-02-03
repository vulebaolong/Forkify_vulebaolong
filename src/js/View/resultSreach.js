import View from "./View.js"
import icons from "url:../../img/icons.svg" //pacel 2

class ResultSreach extends View {
    _parentEl = ".results"

    _createHtml(result) {
        //preview__link--active
        return result
            .map((e) => {
                return `
                <li class="preview " data-id="${e.id}">
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

export default new ResultSreach()
