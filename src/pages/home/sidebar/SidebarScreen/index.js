import React, {useCallback, useRef} from 'react';
import sidebarPropTypes from './sidebarPropTypes';
import BaseSidebarScreen from './BaseSidebarScreen';
import FloatingActionButtonAndPopover from './FloatingActionButtonAndPopover';
import FreezeWrapper from '../../../../libs/Navigation/FreezeWrapper';
import withWindowDimensions from '../../../../components/withWindowDimensions';

function SidebarScreen(props) {
    const popoverModal = useRef(null);

    /**
     * Method to hide popover when dragover.
     */
    const hidePopoverOnDragOver = useCallback(() => {
        if (!popoverModal.current) {
            return;
        }
        popoverModal.current.hideCreateMenu();
    }, []);

    /**
     * Method create event listener
     */
    const createDragoverListener = () => {
        document.addEventListener('dragover', hidePopoverOnDragOver);
    };

    /**
     * Method remove event listener.
     */
    const removeDragoverListener = () => {
        document.removeEventListener('dragover', hidePopoverOnDragOver);
    };

    return (
        <FreezeWrapper keepVisible={!props.isSmallScreenWidth}>
            <BaseSidebarScreen
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...props}
            >
                <FloatingActionButtonAndPopover
                    ref={popoverModal}
                    onShowCreateMenu={createDragoverListener}
                    onHideCreateMenu={removeDragoverListener}
                />
            </BaseSidebarScreen>
        </FreezeWrapper>
    );
}

SidebarScreen.propTypes = sidebarPropTypes;
SidebarScreen.displayName = 'SidebarScreen';

export default withWindowDimensions(SidebarScreen);
