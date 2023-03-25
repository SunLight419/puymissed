import React from 'react';
import './UpdateHistory.css';

const UpdateHistory = ({ updates }) => {

    return (
        <div className="update-history">
            <h3>更新履歴</h3>
            <div className="update-list">
                {updates.slice().reverse().map((update, index) => (
                    <div key={index} className="update-item">
                        {update}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpdateHistory;
