export type overviewProps = {
  faddrar: fadderProps[];
}
export type fadderType = {
  name: string;
  color: string
}
export type shirtSize = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

export type fadderProps = {
  firstName: string;
  lastName: string;
  shirtSize: string;
  allergies?: string;
  fadderType?: fadderType[]
  email: string;
  phone: string;
  id: string;
}
export type searchBarProps = {
  editTags: boolean;
  editFadder: boolean;
  selectedFaddrar: fadderProps[];
  updateSelected: (updated: fadderProps[]) => void;
  singleFadder: fadderProps | undefined;
  updateFadder: (updated: fadderProps) => void; 
  updateMultipleTags: (updated: fadderProps[]) => void
}