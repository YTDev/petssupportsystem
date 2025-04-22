import React from "react";

const PaginationControl = ({
    currentPage,
    totalPages,
    paginate,
    totalItems,
    itemsPerPage
}) => {
    const pageNumbers = [];

    // Calculate page numbers to show (show 5 pages max)
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    // Adjust startPage if we're near the end
    if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    // Calculate indices for "Showing X-Y of Z" display
    const indexOfFirstItem = (currentPage - 1) * itemsPerPage + 1;
    const indexOfLastItem = Math.min(currentPage * itemsPerPage, totalItems);

    // Next and previous page functions
    const nextPage = () => {
        if (currentPage < totalPages) {
            paginate(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            paginate(currentPage - 1);
        }
    };

    return (
        <div className="mt-6">
            {/* Display pagination information */}
            <div className="text-center text-gray-600">
                {totalItems > 0 ? (
                    <p>Showing {indexOfFirstItem}-{indexOfLastItem} of {totalItems} items</p>
                ) : (
                    <p>No items found</p>
                )}
            </div>

            {/* Pagination controls */}
            <nav className="flex justify-center mt-4 mb-8">
                <ul className="inline-flex items-center -space-x-px">
                    {/* Previous button */}
                    <li>
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className={`${currentPage === 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-gray-100"
                                } block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300`}
                        >
                            Previous
                        </button>
                    </li>

                    {/* Page numbers */}
                    {pageNumbers.map(number => (
                        <li key={number}>
                            <button
                                onClick={() => paginate(number)}
                                className={`${currentPage === number
                                        ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                                        : "bg-white border-gray-300 text-gray-500 hover:bg-gray-100"
                                    } py-2 px-3 leading-tight border`}
                            >
                                {number}
                            </button>
                        </li>
                    ))}

                    {/* Next button */}
                    <li>
                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className={`${currentPage === totalPages || totalPages === 0
                                    ? "cursor-not-allowed opacity-50"
                                    : "cursor-pointer hover:bg-gray-100"
                                } block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300`}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default PaginationControl;