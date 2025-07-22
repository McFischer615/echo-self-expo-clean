// components/ui/dialog.tsx
import React from "react";
import { Dialog, Portal, Button, Paragraph } from "react-native-paper";

interface DialogProps {
  visible: boolean;
  title?: string;
  description?: string;
  onDismiss: () => void;
}

export const AppDialog: React.FC<DialogProps> = ({ visible, title, description, onDismiss }) => (
  <Portal>
    <Dialog visible={visible} onDismiss={onDismiss}>
      {title && <Dialog.Title>{title}</Dialog.Title>}
      {description && (
        <Dialog.Content>
          <Paragraph>{description}</Paragraph>
        </Dialog.Content>
      )}
      <Dialog.Actions>
        <Button onPress={onDismiss}>OK</Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
);
