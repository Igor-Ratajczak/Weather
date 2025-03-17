export class Graph {
  private GRAPH_WIDTH = 2400; // Total graph width in pixels.
  private maxTemp = 0; // Highest temperature in the data.
  private chartHeight = 200; // Graph height in pixels.
  private padding = 30; // Padding for the graph area.
  private offsetY = 0; // Vertical offset for graph alignment.
  private xScale = 100; // Horizontal distance between points.
  public yScale = 0; // Vertical scaling for temperature.
  public minTemp = 0; // Lowest temperature in the data.

  constructor(hours: WeatherForecastHours[]) {
    const temperatures = hours.map((hour) => hour.temperature);
    this.GRAPH_WIDTH = hours.length * 100; // Scale width by the number of hours.
    this.maxTemp = Math.max(...temperatures); // Find max temperature.
    this.minTemp = Math.min(...temperatures); // Find min temperature.
    this.yScale = (this.chartHeight - 2 * this.padding) / (this.maxTemp - this.minTemp); // Compute Y scale.
    this.offsetY = this.chartHeight - this.padding + 50; // Set vertical offset.
  }

  /**
   * Calculates the offset percentage for a gradient stop.
   * @param index - Position of the gradient stop.
   * @returns Offset as a percentage string (e.g., '25%').
   */
  public getOffset(index: number): string {
    const totalHours = this.GRAPH_WIDTH / 100; // Number of hours (width / 100 px per hour)
    const percentage = (index / (totalHours - 1)) * 100; // Równomierne rozłożenie punktów //
    return `${percentage}%`;
  }

  /**
   * Generates an SVG path for the temperature graph.
   * @param hours - Array of forecast data with temperatures.
   * @returns SVG path string for the graph.
   */
  public generatePath(hours: WeatherForecastHours[]) {
    if (!hours || hours.length < 2) return ''; // Return empty path for insufficient data.

    let path = `M 0 ${this.offsetY - (hours[0]!.temperature - this.minTemp) * this.yScale}`; // Start point.
    for (let i = 1; i < hours.length; i++) {
      const prevX = (i - 1) * this.xScale + 45;
      const prevY = this.offsetY - (hours[i - 1]!.temperature - this.minTemp) * this.yScale;
      const currX = i * this.xScale + 45;
      const currY = this.offsetY - (hours[i]!.temperature - this.minTemp) * this.yScale;

      // Add Bézier curve segment.
      path += ` C ${prevX + this.xScale / 2} ${prevY}, ${currX - this.xScale / 2} ${currY}, ${currX} ${currY}`;
    }

    // Close the path to create a filled area under the curve.
    path += ` L ${this.GRAPH_WIDTH} ${this.offsetY - (hours[hours.length - 1]!.temperature - this.minTemp) * this.yScale} L ${this.GRAPH_WIDTH} 250 L 0 250 Z`;
    return path;
  }
}
