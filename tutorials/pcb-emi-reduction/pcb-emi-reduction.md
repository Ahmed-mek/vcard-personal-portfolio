# reducing Electromagnetic Interference (EMI) in PCB Design

**Category:** Hardware & PCB Design
**Date:** April 2026

## Overview
Electromagnetic Interference (EMI) can severely degrade the performance of mixed-signal systems. When designing compact boards for motor controllers or drones, managing noise is critical. Here are essential tips for laying out your next PCB.

## 1. Solid Ground Planes
The most effective way to reduce EMI is to provide a low-impedance return path for high-frequency signals. 
- Always dedicate at least one full layer to **GND**.
- Avoid routing traces across splits in the ground plane.

## 2. Decoupling Capacitors
Place decoupling capacitors as close to your IC power pins as physically possible. 
- A standard combination of **0.1µF** and **10µF** works well.
- Use vias directly to the ground plane immediately after the capacitor pad to minimize trace inductance.

## Media / Code 
*(Embed your code snippets or Altium/KiCad screenshots here!)*
```cpp
// Example: Hardware initialization routine preventing start-up noise
void initHardware() {
    disableInterrupts();
    configurePowerRails();
    enableInterrupts();
}
```
