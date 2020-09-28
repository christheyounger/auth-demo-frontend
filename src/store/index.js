import React from 'react';
import useGlobalHook from 'use-global-hook';
import actions from '../Actions';

const initialState = {
    security: {
        user: null,
        state: 'yf42fj9',
        accessToken: null,
        refreshToken: null,
        status: 'anonymous',
        error: null,
    },
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;
