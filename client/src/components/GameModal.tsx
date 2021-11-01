import React, { useState } from "react";
import Modal from 'react-modal';
import * as Yup from 'yup';
import { cloneDeep } from 'lodash';

import { GameListingInterface } from '../../types';
import { addGame } from '../api';
import GameForm from './GameForm';

interface GameFormProps {
    closeModal: any;
    modalIsOpen: boolean;
}

export default function GameFormWrapper({ closeModal, modalIsOpen }: GameFormProps) {

    return (
        <React.Fragment>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                overlayClassName="fixed top-0 left-0 w-full h-full z-50 cursor-pointer overflow-scroll"
                shouldCloseOnOverlayClick={true}
                className="relative z-20 mx-32 cursor-default overflow-x-hidden"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    },
                    content: {
                        outline: 'none',
                        paddingTop: '80px',
                        paddingBottom: '10vh',
                    },
                }}
            >
                <div
                    className="rounded-lg"
                    style={{
                        boxShadow: '0 0 16px 0 rgba(0, 0, 0, 0.09)',
                    }}
                >
                    <GameModal closeModal={closeModal} />
                </div>
            </Modal>
        </React.Fragment>
    );
}

// @ts-ignore
function GameModal({ closeModal }) {
    const [id, setId] = useState(0);

    const handleOnSubmit = async (values: GameListingInterface): Promise<boolean> => {
        const gameWasAdded: boolean = await onSubmit(values);
        if (gameWasAdded) {
            closeModal();
            return true;
        }
        return false;
    };

    const onSubmit = async (gameInfo: GameListingInterface) => {
        const gameInfoWithIds = await addIdsToGameInfo(gameInfo);

        const response = await addGame(gameInfoWithIds);
        return !!response;
    };

    const addIdsToGameInfo = (game: GameListingInterface) => {
        const gameClone = cloneDeep(game);

        if (gameClone.images.length > 0) {
            gameClone.images.forEach((image, index) => {
                const newId = id + 1;
                gameClone.images[index].type = 1; // setting to what is in the test json
                gameClone.images[index].id = `${newId}`; // giving the image a unique id based on general concept
                setId(newId);
            });
        }

        return gameClone;
    };


return (
    <div className="bg-white p-4 rounded-lg relative">
        <div className="p-4 relative">
            {closeModal && (
                <div
                    className="absolute cursor-pointer top-0 right-0"
                    onClick={closeModal}
                >
                    <img src="/close.png" width={16} height={16}  alt="Close icon"/>
                </div>
            )}
            <GameForm
                validationSchema={formValidation}
                onSubmit={handleOnSubmit}
            />
                </div>
                </div>
);
}


const formValidation = {
    category: Yup.string().nullable(),
    title: Yup.string().required('Title is required'),
    subtitle: Yup.string().nullable(),
    description: Yup.string().required('Description is required'),
    images: Yup.array().of(
        Yup.object().shape({
            id: Yup.string().nullable(),
            url: Yup.string().max(512, 'Url must be at most 512 characters').nullable(),
            type: Yup.number().nullable(),
        }),
    ),
    type: Yup.string().nullable(),
    tags: Yup.array().of(
        Yup.string().nullable(),
    ),
    author: Yup.string().nullable(),
    replayBundleUrlJson: Yup.string().nullable(),
    duration: Yup.number().min(1).nullable(),
    isDownloadable: Yup.boolean(),
    isStreamable: Yup.boolean(),
    version: Yup.string().nullable(),
};
