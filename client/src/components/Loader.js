import React from 'react';

export const Loader = () => (
    <div style={{display: 'flex', justifyContent: 'center', paddingTop: '2rem'}}>
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Загрузка...</span>
        </div>
    </div>

)