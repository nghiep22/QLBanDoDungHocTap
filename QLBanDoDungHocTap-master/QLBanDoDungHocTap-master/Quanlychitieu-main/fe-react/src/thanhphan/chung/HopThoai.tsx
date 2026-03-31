import type { ReactNode } from 'react';

interface Props {
    dangMo: boolean;
    dongLai: () => void;
    tieuDe: string;
    children: ReactNode;
}

export default function HopThoai({ dangMo, dongLai, tieuDe, children }: Props) {
    if (!dangMo) return null;

    return (
        <div className="modal" style={{ display: 'flex' }} onClick={dongLai}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{tieuDe}</h2>
                    <button className="modal-close" onClick={dongLai}>&times;</button>
                </div>
                {children}
            </div>
        </div>
    );
}
