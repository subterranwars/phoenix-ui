export class Building {
  constructor(public id: number, public label: string) {}

  isResourceBuilding(): boolean {
    return this.id === 7;
  }

  isResearchlab() {
    return this.id === 21;
  }
}
