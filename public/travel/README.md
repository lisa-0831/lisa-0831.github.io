# Travel photo folders

Place personal travel photos inside the matching state folder:

```text
public/travel/states/
├── CA/
├── NY/
├── MA/
├── GA/
├── TN/
├── NC/
├── DC/
└── NJ/
```

Sample folders for SC and VA are still on disk, but those states are not marked as visited.

Each visited-state folder currently contains three temporary sample images:

```text
01.jpg
02.jpg
03.jpg
```

## Replacing a sample photo

1. Export a personal photo as JPG or WebP.
2. Replace `01.jpg`, `02.jpg`, or `03.jpg` in the matching state folder.
3. Keep the same filename to update the site without changing code.

More photos can be added with sequential names such as `04.jpg`. New filenames must also be added
to that state's entry in `src/App.tsx`.

## Adding another state

1. Create a folder under `public/travel/states/` using the state's two-letter map abbreviation,
   for example: `NC/`.
2. Add that state's images to the new folder.
3. Add the state to `demoTrips` and `demoPhotos` in `src/App.tsx`.

The current images are layout placeholders and should be removed as personal photos are added.
