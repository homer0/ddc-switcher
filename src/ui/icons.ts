export type GetDisplayColorOptions = {
  displayBackgroundColor: string;
};

export const getDisplayIcon = ({
  displayBackgroundColor,
}: GetDisplayColorOptions): string => `
<svg width="250" height="203.512" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill-rule="nonzero"><path fill="#CCCBCA" d="M87.551 158.988h74.609v26.73H87.551z"/><path fill="#E8E8E8" d="M182.719 196.086H67l20.559-10.37h74.601z"/><path fill="#CCCBCA" d="M67 196.09h115.719v7.422H67z"/><path fill="#AAA" d="M87.551 168.754h57.769L87.551 182.14z"/></g><g><rect fill="#D8D8D8" width="250" height="168.667" rx="14"/><rect fill="${displayBackgroundColor}" fill-rule="nonzero" x="7.617" y="7.621" width="234.766" height="153.516" rx="11"/><path d="M7.617 102.352V7.622h110.718z" opacity=".15" fill="#FFF" fill-rule="nonzero"/></g></g></svg>
`;
