import React, { useState } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  Star, 
  MapPin, 
  ChevronRight, 
  Compass
} from 'lucide-react';
import InteractiveMap from '../components/map/InteractiveMap';
import BottomNavigation from '../components/common/BottomNavigation';

/**
 * SCREEN 2: Home & Charger Discovery
 * - Desktop: Split responsive workspace (searchable station directory on left, live interactive map on right)
 * - Mobile: Exact layout from reference image with search bar, speed filter pills, full map, floating station card, and bottom navigation
 */
export default function HomeScreen({ 
  stations = [], 
  selectedStation, 
  onSelectStation, 
  onOpenStationDetails,
  onNavigateTab
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'fast' | 'normal'
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Filter stations based on search query and speed filter
  const filteredStations = stations.filter(station => {
    const matchesSearch = station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          station.address.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (activeFilter === 'fast') {
      return station.connectors.some(c => c.type === 'DC Fast');
    }
    if (activeFilter === 'normal') {
      return station.connectors.some(c => c.type === 'AC Normal');
    }
    return true;
  });

  const currentStation = selectedStation || filteredStations[0] || stations[0];

  return (
    <div className="home-screen-root">
      {/* Search & Filter Header Strip (Mobile view top, also visible on desktop sidebar) */}
      <div className="home-search-filter-bar">
        {/* Search Bar matching reference image */}
        <div className="search-input-wrapper">
          <Search size={18} color="#71817D" className="search-icon" />
          <input 
            type="text"
            id="station-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a location or charger"
            aria-label="Search for a location or charger"
          />
          {searchQuery && (
            <button 
              className="search-clear-btn"
              onClick={() => setSearchQuery('')}
            >
              ×
            </button>
          )}
        </div>

        {/* Filter Chips Row: All, Fast (DC), Normal (AC) + Filter Icon */}
        <div className="filter-chips-row">
          <button
            id="filter-all-btn"
            onClick={() => setActiveFilter('all')}
            className={`filter-chip ${activeFilter === 'all' ? 'active' : ''}`}
          >
            All
          </button>

          <button
            id="filter-fast-btn"
            onClick={() => setActiveFilter('fast')}
            className={`filter-chip ${activeFilter === 'fast' ? 'active' : ''}`}
          >
            Fast (DC)
          </button>

          <button
            id="filter-normal-btn"
            onClick={() => setActiveFilter('normal')}
            className={`filter-chip ${activeFilter === 'normal' ? 'active' : ''}`}
          >
            Normal (AC)
          </button>

          <button
            id="filter-modal-toggle-btn"
            onClick={() => setShowFilterModal(!showFilterModal)}
            className="filter-icon-btn"
            title="Filter Settings"
          >
            <SlidersHorizontal size={15} />
          </button>
        </div>
      </div>

      {/* Main Content Area: Responsive Split View */}
      <div className="home-content-split">
        {/* Left Column (Desktop Stations Directory) */}
        <div className="home-stations-directory">
          <div className="directory-header">
            <div>
              <h2 className="directory-title">Charging Stations</h2>
              <p className="directory-count">
                {filteredStations.length} station{filteredStations.length === 1 ? '' : 's'} available in Bengaluru
              </p>
            </div>
            <div className="directory-view-badge">
              <span className="live-pulse-dot" />
              <span>Live Availability</span>
            </div>
          </div>

          <div className="stations-cards-list">
            {filteredStations.length === 0 ? (
              <div className="no-stations-found">
                <Compass size={36} color="#71817D" />
                <h3>No charging stations match your filter</h3>
                <p>Try clearing your search or switching to "All" chargers.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
                  className="reset-filters-btn"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredStations.map((st) => {
                const isSelected = currentStation?.id === st.id;
                return (
                  <div
                    key={st.id}
                    id={`station-card-${st.id}`}
                    onClick={() => onSelectStation(st)}
                    className={`station-directory-card ${isSelected ? 'selected' : ''}`}
                  >
                    <div 
                      className="station-card-thumbnail"
                      style={{ backgroundImage: `url(${st.image})` }}
                    />
                    <div className="station-card-body">
                      <div className="station-card-top">
                        <h3 className="station-card-name">{st.name}</h3>
                        <span className="station-card-distance">
                          <MapPin size={12} />
                          {st.distance}
                        </span>
                      </div>

                      <div className="station-card-meta">
                        <span className="station-card-rating">
                          <Star size={12} fill="#F5A623" color="#F5A623" />
                          <strong>{st.rating}</strong> ({st.reviewCount})
                        </span>
                        <span className="station-meta-divider">•</span>
                        <span className="station-card-avail">{st.availability}</span>
                      </div>

                      <div className="station-card-connectors">
                        {st.connectors.map(c => (
                          <span key={c.id} className="connector-tag">
                            {c.type} ({c.power})
                          </span>
                        ))}
                      </div>

                      <div className="station-card-actions">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenStationDetails(st);
                          }}
                          className="view-details-action-btn"
                          id={`view-details-${st.id}`}
                        >
                          <span>View Station & Book</span>
                          <ChevronRight size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Interactive Map Canvas */}
        <div className="home-map-container">
          <InteractiveMap 
            stations={filteredStations}
            selectedStationId={currentStation?.id}
            onSelectStation={(id) => {
              const found = stations.find(s => s.id === id);
              if (found && onSelectStation) onSelectStation(found);
            }}
          />

          {/* Floating Charger Preview Card at Bottom (Mobile view matching Screen 2) */}
          {currentStation && (
            <div className="mobile-floating-station-card-wrapper mobile-only">
              <div
                id="mobile-station-preview-card"
                onClick={() => onOpenStationDetails(currentStation)}
                className="mobile-station-preview-card"
              >
                {/* Station Cover Thumbnail */}
                <div 
                  className="preview-card-img"
                  style={{ backgroundImage: `url(${currentStation.image})` }}
                />

                {/* Station Info */}
                <div className="preview-card-details">
                  <h3 className="preview-card-title">
                    {currentStation.name}
                  </h3>

                  <div className="preview-card-meta">
                    <span className="meta-item">
                      <MapPin size={11} color="#71817D" />
                      {currentStation.distance}
                    </span>
                    <span>•</span>
                    <span className="meta-item">
                      <Star size={11} fill="#F5A623" color="#F5A623" />
                      <strong>{currentStation.rating}</strong> ({currentStation.reviewCount})
                    </span>
                    <span>•</span>
                    <span className="meta-avail">
                      {currentStation.availability}
                    </span>
                  </div>

                  <div className="preview-card-tags">
                    <span className="preview-pill">DC Fast</span>
                    <span className="preview-pill">AC Normal</span>
                  </div>
                </div>

                <div className="preview-card-arrow">
                  <ChevronRight size={18} strokeWidth={2.4} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Fixed Bottom Navigation (matching Screen 2 from reference image) */}
      <div className="mobile-only">
        <BottomNavigation activeTab="home" onTabChange={onNavigateTab} />
      </div>

      {/* Filter Modal Dialog */}
      {showFilterModal && (
        <div 
          className="filter-modal-backdrop"
          onClick={() => setShowFilterModal(false)}
        >
          <div 
            className="filter-modal-sheet"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="filter-sheet-header">
              <h3>Filter Chargers</h3>
              <button onClick={() => setShowFilterModal(false)}>✕</button>
            </div>
            <div className="filter-sheet-body">
              <div className="filter-group">
                <label>Connector Types</label>
                <div className="filter-group-buttons">
                  <button 
                    className={`sheet-btn ${activeFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveFilter('all')}
                  >
                    All Connectors
                  </button>
                  <button 
                    className={`sheet-btn ${activeFilter === 'fast' ? 'active' : ''}`}
                    onClick={() => setActiveFilter('fast')}
                  >
                    CCS2 (DC Fast)
                  </button>
                  <button 
                    className={`sheet-btn ${activeFilter === 'normal' ? 'active' : ''}`}
                    onClick={() => setActiveFilter('normal')}
                  >
                    Type 2 AC (Normal)
                  </button>
                </div>
              </div>
              <div className="filter-group">
                <label>Amenities</label>
                <div className="filter-amenities-tags">
                  <span className="amenity-tag">24/7 Access</span>
                  <span className="amenity-tag">Restroom</span>
                  <span className="amenity-tag">Cafe</span>
                  <span className="amenity-tag">Covered Bay</span>
                </div>
              </div>
              <button 
                onClick={() => setShowFilterModal(false)}
                className="apply-filter-btn"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
