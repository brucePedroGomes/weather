import { Button, ButtonProps, Center } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { Units, unitsAtom } from "../atoms";

export function CelsiusOrFahrenheit() {
  const [units, setUnits] = useAtom(unitsAtom);

  const isCelsius = units === Units.celsius;

  return (
    <Center height="8" justifyContent="space-around" alignItems="center" w="24">
      <UnstyledButton
        label="°C"
        onClick={() => setUnits(Units.celsius)}
        opacity={!isCelsius ? "0.1" : void 0}
      />

      <UnstyledButton
        label="°F"
        opacity={isCelsius ? "0.1" : void 0}
        onClick={() => setUnits(Units.fahrenheit)}
      />
    </Center>
  );
}

function UnstyledButton({ label, ...rest }: { label: string } & ButtonProps) {
  return (
    <Button
      variant="unstyled"
      fontSize="4xl"
      {...rest}
      _focus={{ border: "none" }}
    >
      {label}
    </Button>
  );
}
