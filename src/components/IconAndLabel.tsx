import { HStack, Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";

type Props = { icon: IconType; label: string | number };

export function IconAndLabel({ icon, label }: Props) {
  return (
    <HStack>
      <Icon as={icon} boxSize="8" />
      <Text>{label}</Text>
    </HStack>
  );
}
