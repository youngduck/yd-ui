import React from "react";
import * as S from "./ButtonStyle";

export interface ButtonProps {
  children: React.ReactNode;
  option: {
    onClick?: () => void;
    $isActive?: boolean;
    $mode: "delete" | "generate" | "save" | "elmark" | "excel" | "elfile";
    $width?: string;
    $height?: string;
  };
}

export const Button = ({
  children,
  option: { onClick, $isActive = true, $mode = "save", $width, $height },
}: ButtonProps) => {
  if (!$isActive) return null;

  return (
    <S.StyledButton
      onClick={onClick}
      $mode={$mode}
      $width={$width}
      $height={$height}
    >
      {children}
    </S.StyledButton>
  );
};
