import { ArrowLeft, ArrowRight } from 'lucide-react';
import React from 'react';

interface PaginationProps {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    paginate: (pageNumber: number) => void;
}

const Paginate: React.FC<PaginationProps> = ({ currentPage, itemsPerPage, totalItems, paginate }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageNumbers = Array.from({ length: Math.min(10, totalPages) }, (_, index) => {
        return Math.max(1, currentPage - 5) + index;
    });

    return (
        <div className="flex justify-center mt-4">
            <nav>
                <ul className="flex list-none">
                    <li className="mx-1">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-200'}`}
                            disabled={currentPage === 1}
                        >
                            <ArrowLeft />
                        </button>
                    </li>
                    {pageNumbers.map(pageNumber => (
                        <li key={pageNumber} className="mx-1">
                            <button
                                onClick={() => paginate(pageNumber)}
                                className={`px-3 py-1 rounded ${currentPage === pageNumber ? 'bg-[#4ade80] text-[#333] font-bold' : 'bg-gray-200'}`}
                            >
                                {pageNumber}
                            </button>
                        </li>
                    ))}
                    <li className="mx-1">
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-200'}`}
                            disabled={currentPage === totalPages}
                        >
                            <ArrowRight />

                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Paginate;