import { FC } from 'react';
import { useProfileCards } from '../../hooks/useProfileCards'

export const FileInput: FC = () => {
    const { handleFiles, imageContainerRef } = useProfileCards();
	return (
		<div>
			<input type="file" accept="image/*" onChange={handleFiles} />
            <div ref={imageContainerRef} />
		</div>
	);
};