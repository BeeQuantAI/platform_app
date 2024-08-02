import { useState } from 'react';
import styled from 'styled-components';
import {
  colorAccent,
  colorAdditional,
  colorBackgroundBody,
  colorBorder,
  colorFieldsBorder,
  colorText,
  colorWhite,
} from '@/styles/palette';

const CustomDropdownContainer = styled.div`
  width: 100%;
  position: relative;
`;

const CustomDropdownHeader = styled.div`
  border: 1px solid ${colorFieldsBorder};
  color: ${colorText};
  width: 100%;
  padding: 5px 10px;
  cursor: pointer;
`;

const CustomDropdownListContainer = styled.div`
  position: absolute;
  z-index: 100;

  -webkit-appearance: none;
  width: 100%;
  padding: 0px 10px;
  font-size: 12px;

  transition: border 0.3s;
  background: ${colorBackgroundBody};
  border: 1px solid ${colorFieldsBorder};
  color: ${colorText};

  &::-webkit-input-placeholder {
    color: ${colorAdditional};
  }
  &::-moz-placeholder {
    color: ${colorAdditional};
  }
  /* Firefox 19+ */
  &:-moz-placeholder {
    color: ${colorAdditional};
  }
  /* Firefox 18- */
  &:-ms-input-placeholder {
    color: ${colorAdditional};
  }
`;

const pathDropdownArrow = 'img/dropdownArrow.svg';

const CustomDropdownSelectButton = styled.span<{ $backgroundImage: string }>`
  position: absolute;
  right: 0px;
  top: 0px;
  width: 32px;
  height: 32px;
  pointer-events: none;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-60%);
    width: 16px;
    height: 16px;
    background-image: ${({ $backgroundImage }) => `url(${$backgroundImage})`};
    background-size: cover;
    background-repeat: no-repeat;
  }
`;

const CustomDropdownUl = styled.ul`
  box-sizing: border-box;

  padding: 0px;
  margin: 0px 0px 0px -10px;
  width: calc(100% + 20px);
  background: ${colorBackgroundBody};
  border: 2px solid ${colorBorder};
`;

const CustomDropdownLi = styled.li`
  list-style: none;
  padding: 5px 0px 0px 10px;
  margin: 0;
  width: 100%;
  height: 32px;
  color: ${colorText};
  background: ${colorBackgroundBody};

  &:hover {
    background: ${colorAccent};
    color: ${colorWhite};
  }
`;

type CustomDropdownListProps = {
  list: string[];
  listName: string;
  onChange: (value: string) => void;
  value: string;
  defaultValue: string;
};

export default function CustomDropdownList({
  list,
  listName,
  onChange,
  value,
  defaultValue,
}: CustomDropdownListProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (optionClicked: string) => {
    setSelectedOption(optionClicked);
    setIsOpen(false);
  };

  return (
    <CustomDropdownContainer>
      <CustomDropdownHeader onClick={toggling}>
        {selectedOption || defaultValue}
      </CustomDropdownHeader>
      {isOpen && (
        <CustomDropdownListContainer>
          <CustomDropdownUl id={listName}>
            {list.map((option) => (
              <CustomDropdownLi
                data-testid={`${listName}-${option.toString()}`}
                key={option.toString()}
                onClick={() => {
                  onChange(option);
                  onOptionClicked(option);
                }}
                className={value === option ? 'selected' : ''}
              >
                {option}
              </CustomDropdownLi>
            ))}
          </CustomDropdownUl>
        </CustomDropdownListContainer>
      )}
      <CustomDropdownSelectButton $backgroundImage={pathDropdownArrow} />
    </CustomDropdownContainer>
  );
}
