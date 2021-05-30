import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/authContext";
import {Progress_0} from "./Progress/Progress_0";
import {Progress_25} from "./Progress/Progress_25";
import {Progress_50} from "./Progress/Progress_50";
import {Progress_75} from "./Progress/Progress_75";
import {Progress_100} from "./Progress/Progress_100";

export const Progress = () => {
    const auth = useContext(AuthContext);
    const [progressData, setProgressData] = useState(null);
    const {request} = useHttp();

    const getLink = useCallback(async () => {
        try {
            const data = await request('/api/user/output_progress', 'POST', null, {
                Authorization: `${auth.token}`
            });
            setProgressData(data);
        } catch (e) {}
    }, [auth.token, request]);

    useEffect(() => {
        getLink();
    }, [getLink]);

    function CheckProgress() {
        if (progressData.progress === 0) return <Progress_0 data={progressData}/>
        if (progressData.progress === 25) return <Progress_25 data={progressData}/>
        if (progressData.progress === 50) return <Progress_50 data={progressData}/>
        if (progressData.progress === 75) return <Progress_75 data={progressData}/>
        if (progressData.progress === 100) return <Progress_100 data={progressData}/>
    }

    return (
        <>
            { progressData && CheckProgress() }
        </>
    );
}