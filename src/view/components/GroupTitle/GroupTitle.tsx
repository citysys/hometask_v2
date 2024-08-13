import React from 'react';
interface GroupTitleProps {
    title: string;

}

const GroupTitle: React.FC<GroupTitleProps> = ({ title }) => {
    return (
        <>
            <h2 className='section-title'>
                {title}:
                <span className='section-seperator'></span>
            </h2>
        </>
    );
};

export default GroupTitle;