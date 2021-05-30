import React from 'react';

export const Progress_25 = ({ data }) => {
    return (
        <div className="progressbar progressbar-25">
            <div className="progressbar__box">
                <div className="progressbar__from">
                    <p>
                        { data.scores }
                        %
                    </p>
                    <span>dsfg gsfdghh hgfhdf</span>
                </div>
                <div className="progressbar__lvl">
                    <p>
                        <span>
                            { data.lvl }
                        </span>
                        lvl
                    </p>
                </div>
                <div className="progressbar__to">
                    <p>
                        18
                        %
                    </p>
                    <span>dsfg gsfdghh hgfhdf</span>
                </div>
            </div>
            <div className="progressbar__scale progressbar__scale-25"/>
        </div>
    );
}

