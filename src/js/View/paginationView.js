import View from "./View.js"
import icons from "url:../../img/icons.svg" //pacel 2

class PaginationView extends View {
    _parentEl = ".pagination"

    addEventPagination(handler) {
        this.getParentEl().addEventListener("click", (e) => {
            const btn = e.target.closest(".btn--inline")
            if (!btn) return
            handler(btn.dataset.goto)
        })
    }

    _createHtml(data) {
        const curPage = data.page
        const perPage = data.perPage
        const totalPage = Math.ceil(data.result.length / perPage)
        // console.log(data)
        // console.log(curPage, perPage, totalPage)

        const pageAndToTalPage = function () {
            return `
            <span class="pagination__page">${curPage} / ${perPage}</span>
            `
        }

        const btnPrev = function (curPage) {
            return `
            <button class="btn--inline pagination__btn--prev" data-goto="${
                curPage - 1
            }">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage - 1}</span>
            </button>
            
            `
        }

        const btnNext = function (curPage) {
            return `
            
            <button class="btn--inline pagination__btn--next" data-goto="${
                curPage + 1
            }">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                    <use
                        href="${icons}#icon-arrow-right"
                    ></use>
                </svg>
            </button>
            `
        }

        // tại trang 1 và có nhiều trang
        if (curPage === 1 && totalPage > 1) {
            return `<div style="width: 9.392rem;"></div>${pageAndToTalPage()}${btnNext(
                curPage
            )}`
        }

        //trang cuối cùng
        if (curPage === totalPage && totalPage > 1) {
            return `${btnPrev(
                curPage
            )} ${pageAndToTalPage()}<div style="width: 9.392rem;"></div>`
        }

        //những trang ở giữa
        if (curPage > 1 && curPage < totalPage) {
            return `${btnPrev(curPage)} ${pageAndToTalPage()} ${btnNext(
                curPage
            )}`
        }

        //trang 1 và chỉ có 1 trang
        if (curPage === 1 && totalPage === 1) {
            return ``
        }
    }
}

export default new PaginationView()
