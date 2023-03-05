import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const SearchBar = ({ callback }: any) => (
  <TextInput
    icon={<IconSearch size="1.1rem" stroke={1.5} />}
    radius="md"
    size="sm"
    placeholder="Search..."
    height="100px"
    onChange={({ target }) => {
      callback(target.value);
    }}
  />
);

export default SearchBar;
