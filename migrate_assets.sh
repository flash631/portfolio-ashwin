#!/bin/bash
set -e

cd "$(dirname "$0")"

# Create directories
mkdir -p public/simulations/1_non_newtonian_poiseuille
mkdir -p public/simulations/2_periodic_hill
mkdir -p public/simulations/3_nasa_wall_mounted_hump
mkdir -p public/simulations/4_backward_facing_step
mkdir -p public/simulations/5_cylinder_vortex_shedding
mkdir -p public/simulations/6_buoyant_cavity
mkdir -p public/simulations/7_naca_4412_trailing_edge

# Copy simulation 1
cp simulations/1_Non-Newtonian_planar_Poiseuille_flow/*.mp4 public/simulations/1_non_newtonian_poiseuille/
cp simulations/1_Non-Newtonian_planar_Poiseuille_flow/*.png public/simulations/1_non_newtonian_poiseuille/

# Copy simulation 2
cp simulations/2_Periodic_Hill/*.mp4 public/simulations/2_periodic_hill/
cp simulations/2_Periodic_Hill/*.png public/simulations/2_periodic_hill/

# Copy simulation 3
cp simulations/3_NASA_Wall_Mounted_Hump/*.mp4 public/simulations/3_nasa_wall_mounted_hump/
cp simulations/3_NASA_Wall_Mounted_Hump/*.png public/simulations/3_nasa_wall_mounted_hump/

# Copy simulation 4
cp simulations/4_backward_facing_step/*.mp4 public/simulations/4_backward_facing_step/
cp simulations/4_backward_facing_step/*.png public/simulations/4_backward_facing_step/

# Copy simulation 5
cp simulations/5_cylinder_vortex_shedding/*.mp4 public/simulations/5_cylinder_vortex_shedding/
cp simulations/5_cylinder_vortex_shedding/*.png public/simulations/5_cylinder_vortex_shedding/

# Copy simulation 6
cp simulations/6_bouyant_cavity/*.mp4 public/simulations/6_buoyant_cavity/
cp simulations/6_bouyant_cavity/*.png public/simulations/6_buoyant_cavity/

# Copy simulation 7
cp simulations/7_NASA_4412_Trailing_Edge_Separation/*.mp4 public/simulations/7_naca_4412_trailing_edge/
cp simulations/7_NASA_4412_Trailing_Edge_Separation/*.png public/simulations/7_naca_4412_trailing_edge/

# Delete original simulations folder
rm -rf simulations/

echo "Asset migration complete!"
