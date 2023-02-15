import React, { useContext, useEffect } from 'react';
import systemContext from '../../../context/System/systemContext';
import moment from 'moment';
import Loading from '../../reusable/Loading';

const Logs = () => {
    const { loading, logs, getLogs } = useContext(systemContext);

    useEffect(() => {
        getLogs();
        // eslint-disable-next-line
    }, []);

    return (
        <section id='logs' className='background'>
            <div className='head'>
                <div className='title'>
                    <h2>Logs</h2>
                </div>
                <div className='table-title'>
                    <h4>Logs</h4>
                </div>

                {logs !== null && !loading ? (
                    logs
                        .sort(
                            (a, b) => moment(b.createdAt) - moment(a.createdAt)
                        )
                        .map(({ _id, user, type, action, createdAt }) => (
                            <div className='log-item item' key={_id}>
                                <span>
                                    {moment(createdAt).format(
                                        'MMMM DD, YYYY HH:mm:ss'
                                    )}
                                </span>
                                <p>
                                    <b>{type}</b>
                                </p>
                                <p>{user}</p>
                                <p>{action}</p>
                            </div>
                        ))
                ) : (
                    <Loading />
                )}
            </div>
        </section>
    );
};

export default Logs;
