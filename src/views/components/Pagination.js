import React from 'react'

function Pagination(props) {
    const { lastPage, currentPage, onChange } = props
    let array = []
    for (let i = 1; i <= lastPage; i++) {
        array = [...array, i]
    }
    console.log(currentPage)

    const ifOptions = () => {
        if (currentPage < 4 && lastPage > 7) {
            return (
                <>
                    <li onClick={() => onChange(1)} class="page-item"><a href="#" class={`pagelink ${currentPage === 1 ? 'active' : ''}`}>1</a></li>
                    <li onClick={() => onChange(2)} class="page-item"><a href="#" class={`pagelink ${currentPage === 2 ? 'active' : ''}`}>2</a></li>
                    <li onClick={() => onChange(3)} class="page-item"><a href="#" class={`pagelink ${currentPage === 3 ? 'active' : ''}`}>3</a></li>
                    <li onClick={() => onChange(4)} class="page-item"><a href="#" class={`pagelink ${currentPage === 4 ? 'active' : ''}`}>4</a></li>
                    <li class="page-item"><a href="#" class="pagelink">...</a></li>
                    <li onClick={() => onChange(lastPage - 1)} class="page-item"><a href="#" class={`pagelink ${currentPage === lastPage - 1 ? 'active' : ''}`}>{lastPage - 1}</a></li>
                    <li onClick={() => onChange(lastPage)} class="page-item"><a href="#" class={`pagelink ${currentPage === lastPage ? 'active' : ''}`}>{lastPage}</a></li>
                </>
            )
        } else if (lastPage < 8) {
            return (
                <>
                    {array.map((data, index) =>
                        <>
                            <li onClick={() => onChange(data)} class="page-item"><a href="#" class={`pagelink ${currentPage === data ? 'active' : ''}`}>{data}</a></li>
                        </>
                    )}
                </>
            )
        } else if ((lastPage - currentPage) < 4) {
            return (
                <>
                    <li onClick={() => onChange(1)} class="page-item"><a href="#" class={`pagelink ${currentPage === 1 ? 'active' : ''}`}>1</a></li>
                    <li onClick={() => onChange(2)} class="page-item"><a href="#" class={`pagelink ${currentPage === 2 ? 'active' : ''}`}>2</a></li>
                    <li class="page-item"><a href="#" class="pagelink">...</a></li>
                    <li onClick={() => onChange(lastPage - 3)} class="page-item"><a href="#" class={`pagelink ${currentPage === lastPage - 3 ? 'active' : ''}`}>{lastPage - 3}</a></li>
                    <li onClick={() => onChange(lastPage - 2)} class="page-item"><a href="#" class={`pagelink ${currentPage === lastPage - 2 ? 'active' : ''}`}>{lastPage - 2}</a></li>
                    <li onClick={() => onChange(lastPage - 1)} class="page-item"><a href="#" class={`pagelink ${currentPage === lastPage - 1 ? 'active' : ''}`}>{lastPage - 1}</a></li>
                    <li onClick={() => onChange(lastPage)} class="page-item"><a href="#" class={`pagelink ${currentPage === lastPage ? 'active' : ''}`}>{lastPage}</a></li>
                </>
            )
        } else if (currentPage > 3) {
            return (
                <>
                    <li onClick={() => onChange(currentPage - 3)} class="page-item"><a href="#" class={`pagelink ${currentPage === currentPage - 3 ? 'active' : ''}`}>{currentPage - 3}</a></li>
                    <li onClick={() => onChange(currentPage - 2)} class="page-item"><a href="#" class={`pagelink ${currentPage === currentPage - 2 ? 'active' : ''}`}>{currentPage - 2}</a></li>
                    <li onClick={() => onChange(currentPage - 1)} class="page-item"><a href="#" class={`pagelink ${currentPage === currentPage - 1 ? 'active' : ''}`}>{currentPage - 1}</a></li>
                    <li onClick={() => onChange(currentPage)} class="page-item"><a href="#" class={`pagelink ${currentPage === currentPage ? 'active' : ''}`}>{currentPage}</a></li>
                    <li onClick={() => onChange(currentPage + 1)} class="page-item"><a href="#" class={`pagelink ${currentPage === currentPage + 1 ? 'active' : ''}`}>{currentPage + 1}</a></li>
                    <li onClick={() => onChange(currentPage + 2)} class="page-item"><a href="#" class={`pagelink ${currentPage === currentPage + 2 ? 'active' : ''}`}>{currentPage + 2}</a></li>
                    <li onClick={() => onChange(currentPage + 3)} class="page-item"><a href="#" class={`pagelink ${currentPage === currentPage + 3 ? 'active' : ''}`}>{currentPage + 3}</a></li>
                </>
            )
        } else {
            return (<div>not</div>)
        }
    }
    return (
        <div class="tablepagination">
            <nav class="pagination">
                <ul class="pagination">
                    <li class="first disable"><a href="#" onClick={() => onChange(1)} class="pagelink">{'<<'}</a></li>
                    <li class="prev disable"><a href="#" onClick={() => onChange(currentPage > 1 ? currentPage - 1 : 1)} class="pagelink">{'<'}</a></li>
                    {ifOptions()}
                    <li class="page-item"><a href="#" onClick={() => onChange(currentPage < lastPage ? currentPage + 1 : lastPage)} class="pagelink">{'>'}</a></li>
                    <li class="page-item"><a href="#" onClick={() => onChange(lastPage)} class="pagelink">{'>>'}</a></li>
                </ul>
            </nav>
        </div>

    )
}

export default Pagination

//  ${currentPage === data ? 'active' : 'active'}