import React from 'react'
import styled from '@emotion/styled'

const ModalTitle = styled.h2`
  color: #676A6C;
  padding: 1rem;
  margin: unset;
`

const ModalBackground = styled.div<{ show?: boolean; }>`
  display: flex;
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 5;
  background-color: rgba(0,0,0,0.25);
  align-items: center;
  justify-content: center;
`

const ModalForeground = styled.section`
  background-color: #fff;
  border: 1px solid #dddddd;
`

interface Props {
    show: boolean;
    toggle: () => void
    title: string;
}

export const Modal: React.FC<Props> = ({ show = false, toggle, title, children }) => {
    if (!show) {
        return null
    }
    return (
        <ModalBackground show={show} onClick={toggle}>
            <ModalForeground onClick={(e) => e.stopPropagation()}>
                <ModalTitle>
                    {title}
                </ModalTitle>
                {children}
            </ModalForeground>
        </ModalBackground>
    )
}
