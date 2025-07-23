// components/ui/dialog.tsx
import React from "react";
import styled from "styled-components/native";
import { Dialog as PaperDialog, Portal, Button as PaperButton, Paragraph as PaperParagraph } from "react-native-paper";

interface DialogProps {
  visible: boolean;
  title?: string;
  description?: string;
  onDismiss: () => void;
}

// Optionally style the Paper components (example below, can be omitted if default styling is fine)
const StyledDialog = styled(PaperDialog)`
  /* Add custom styles if needed */
`;

const StyledTitle = styled(PaperDialog.Title)`
  /* Custom title styles */
`;

const StyledContent = styled(PaperDialog.Content)`
  /* Custom content styles */
`;

const StyledParagraph = styled(PaperParagraph)`
  /* Custom paragraph styles */
`;

const StyledActions = styled(PaperDialog.Actions)`
  /* Custom actions styles */
`;

const StyledButton = styled(PaperButton)`
  /* Custom button styles */
`;

export const AppDialog: React.FC<DialogProps> = ({ visible, title, description, onDismiss }) => (
  <Portal>
    <StyledDialog visible={visible} onDismiss={onDismiss}>
      {title && <StyledTitle>{title}</StyledTitle>}
      {description && (
        <StyledContent>
          <StyledParagraph>{description}</StyledParagraph>
        </StyledContent>
      )}
      <StyledActions>
        <StyledButton onPress={onDismiss}>OK</StyledButton>
      </StyledActions>
    </StyledDialog>
  </Portal>
);
