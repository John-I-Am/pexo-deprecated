import { Progress } from "@mantine/core";

const ProgressBar = ({ value, label }: { value: number, label: string}) => (
  <Progress sx={{ width: "100%" }} size="xl" color="violet" label={label} value={value} />
);

export default ProgressBar;
